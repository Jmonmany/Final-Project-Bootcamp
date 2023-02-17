import { useCallback, useMemo, useReducer, useState } from 'react';
import { UsersRepo } from '../../core/services/user-repo/user.repo';
import { User } from '../../features/models/user.model';
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
    getUsers: () => Array<User>;
    getCurrentUser: () => User | object;
    handleAdmin: (uid: string) => void;
    handleCurrentUser: (user: User | object) => void;
    handleUser: (userCredentials: UserCredential) => void;
    handleLoadUsers: () => Promise<void>;
    handleAddUser: (user: User) => Promise<void>;
    handleUpdateUser: (userPayload: Partial<User>) => Promise<void>;
    handleDeleteCard: (uid: User['uid']) => Promise<void>;
};

type Status = 'Starting' | 'Loading' | 'Loaded';

export function useUsers(): useUsersType {
    const repo = useMemo(() => new UsersRepo(), []);
    const initialState: Array<User> = [];
    const initialUser: User | object = {};
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
        const fullUser = new User(
            user.displayName as string,
            user.email as string,
            await user.getIdToken(),
            user.uid
        );
        if (fullUser.uid !== process.env.REACT_APP_FIREBASE_MARINA_UID) {
            set(ref(db, 'users/' + user.uid), fullUser);
        }
        handleCurrentUser(fullUser);
    };

    const handleAdmin = (uid: string) => {
        uid === process.env.REACT_APP_FIREBASE_MARINA_UID
            ? setAdmin(true)
            : setAdmin(false);
    };

    const handleCurrentUser = (user: User | object) => {
        dispatchCurrentUser(ac.setCurrentUser(user as User));
        handleAdmin((user as User).uid);
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

    const handleAddUser = async function (user: User) {
        try {
            const fullUsers = await repo.create(user);
            dispatchUsers(ac.usersAddCreator(fullUsers));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdateUser = async function (userPayload: Partial<User>) {
        try {
            const fullUsers = await repo.update(userPayload);
            dispatchUsers(ac.usersUpdateCreator(fullUsers));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDeleteCard = async function (uid: User['uid']) {
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
