import { useCallback, useMemo, useReducer, useState } from 'react';
import { UsersRepo } from '../../core/services/user-repo/user.repo';
import { UsersClass } from '../../features/models/user.model';
import { usersReducer } from '../../reducers/users/users.reducer';
import { consoleDebug } from '../../tools/debug';
import * as ac from '../../reducers/users/users.action.creator';
import { UserCredential } from 'firebase/auth';
import { currentUserReducer } from '../../reducers/users/current.reducer';
import { db } from '../../config';
import { ref, set } from '@firebase/database';

export type useUsersType = {
    getAdmin: () => boolean;
    getStatus: () => Status;
    getUsers: () => Array<UsersClass>;
    getCurrentUser: () => UsersClass | object;
    handleAdmin: (uid: string) => void;
    handleCurrentUser: (user: UsersClass | object) => void;
    handleUser: (userCredentials: UserCredential) => void;
    handleLoadUsers: () => Promise<void>;
    handleAddUser: (user: UsersClass) => Promise<void>;
    handleUpdateUser: (userPayload: Partial<UsersClass>) => Promise<void>;
    handleDeleteCard: (uid: UsersClass['uid']) => Promise<void>;
};

type Status = 'Starting' | 'Loading' | 'Loaded';

export function useUsers(): useUsersType {
    const repo = useMemo(() => new UsersRepo(), []);
    const initialState: Array<UsersClass> = [];
    const initialUser: UsersClass | object = {};
    const initialStatus = 'Starting' as Status;
    const [users, dispatchUsers] = useReducer(usersReducer, initialState);
    const [admin, setAdmin] = useState(false);
    const [status, setStatus] = useState(initialStatus);
    const [currentUser, dispatchCurrentUser] = useReducer(
        currentUserReducer,
        initialUser
    );

    const getCurrentUser = () => currentUser;
    const getUsers = () => users;
    const getStatus = () => status;
    const getAdmin = () => admin;
    const handleUser = async function (userCredentials: UserCredential) {
        const user = userCredentials.user;
        const fullUser = new UsersClass(
            user.displayName as string,
            user.email as string,
            await (user.getIdToken() as Promise<string>),
            user.uid
        );
        set(ref(db, 'users/' + user.uid), fullUser);
        handleCurrentUser(fullUser);
    };

    const handleAdmin = (uid: string) => {
        uid === process.env.REACT_APP_FIREBASE_MARINA_UID
            ? setAdmin(true)
            : setAdmin(false);
    };

    const handleCurrentUser = (user: UsersClass | object) => {
        dispatchCurrentUser(ac.setCurrentUser(user as UsersClass));
        handleAdmin((user as UsersClass).uid);
    };
    const handleLoadUsers = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            dispatchUsers(ac.usersLoadCreator(data));
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAddUser = async function (user: UsersClass) {
        try {
            const fullUsers = await repo.create(user);
            dispatchUsers(ac.usersAddCreator(fullUsers));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdateUser = async function (userPayload: Partial<UsersClass>) {
        try {
            const fullUsers = await repo.update(userPayload);
            dispatchUsers(ac.usersUpdateCreator(fullUsers));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDeleteCard = async function (uid: UsersClass['uid']) {
        dispatchUsers(ac.usersDeleteCreator(uid));
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        getCurrentUser,
        getAdmin,
        getStatus,
        getUsers,
        handleAdmin,
        handleCurrentUser,
        handleUser,
        handleLoadUsers,
        handleAddUser,
        handleUpdateUser,
        handleDeleteCard,
    };
}
