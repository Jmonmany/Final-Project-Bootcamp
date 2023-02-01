import { UsersClass } from '../../features/models/user.model';
import { usersAction } from './users.action.creator';
import { userActionTypes } from './users.action.types';
export function currentUserReducer(
    state: UsersClass | object,
    action: usersAction
): UsersClass | object{
    switch (action.type) {
        case userActionTypes.setCurrent:
            const currentUser = action.payload as UsersClass;
            return { ...state, ...currentUser };
        default:
            return {...state};
    }
}
