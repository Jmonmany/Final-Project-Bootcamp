import { UsersClass } from '../../features/models/user.model';
import { userActionTypes } from '../users/users.action.types';

export type usersAction = {
    type: string;
    payload: Array<UsersClass> | UsersClass | UsersClass['uid'];
};

export const usersLoadCreator = (payload: Array<UsersClass>): usersAction => ({
    type: userActionTypes.load,
    payload,
});

export const usersAddCreator = (payload: UsersClass): usersAction => ({
    type: userActionTypes.add,
    payload,
});

export const usersUpdateCreator = (payload: UsersClass): usersAction => ({
    type: userActionTypes.update,
    payload,
});

export const setCurrentUser = (payload: UsersClass): usersAction => ({
    type: userActionTypes.setCurrent,
    payload,
});

export const usersDeleteCreator = (
    payload: UsersClass['uid']
): usersAction => ({
    type: userActionTypes.delete,
    payload,
});
