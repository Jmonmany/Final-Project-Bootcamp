import { User } from '../../features/models/user.model';
import { usersAction } from './users.action.creator';
import { userActionTypes } from './users.action.types';
export function currentUserReducer(
    state: User | object,
    action: usersAction
): User | object {
    switch (action.type) {
        case userActionTypes.setCurrent:
            return action.payload as User;
        default:
            return state;
    }
}
