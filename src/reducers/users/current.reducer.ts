import { UsersClass } from '../../features/models/user.model';
import { usersAction } from './users.action.creator';
import { userActionTypes } from './users.action.types';
export function currentUserReducer(
    state: UsersClass | object,
    action: usersAction
): UsersClass | object {
    switch (action.type) {
        case userActionTypes.setCurrent:
            return action.payload as UsersClass;
        default:
            return state;
    }
}
