import { UsersClass } from '../../features/models/user.model';
import { usersAction } from './users.action.creator';
import { userActionTypes } from './users.action.types';
export function usersReducer(
    state: Array<UsersClass>,
    action: usersAction
): Array<UsersClass> {
    switch (action.type) {
        case userActionTypes.load:
            return (action.payload as Array<UsersClass>).filter(
                (user: UsersClass) => user.message.description !== ''
            );
        case userActionTypes.add:
            return [
                ...(state as Array<UsersClass>),
                action.payload as UsersClass,
            ];
        case userActionTypes.update:
            const updateArtwork = action.payload as UsersClass;
            return (state as Array<UsersClass>).map((item) =>
                item.uid === updateArtwork.uid ? updateArtwork : item
            );
        case userActionTypes.delete:
            const finalId = action.payload as UsersClass['uid'];
            return state.filter((item) => item.uid !== finalId);
        case userActionTypes.setCurrent:
            const currentUser = action.payload as UsersClass;
            return { ...state, ...currentUser };
        default:
            return [...state];
    }
}
