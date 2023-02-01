import { UsersClass } from '../../features/models/user.model';
import { usersAction } from './users.action.creator';
import * as ac from './users.action.creator';
import { mockUser1 } from '../../hooks/users/testing.mock';
import { currentUserReducer } from './current.reducer';

describe('Given the reducer', () => {
    let state: UsersClass | object;
    let action: usersAction;
    describe('When the action type is "users@setCurrent"', () => {
        test('Then it should return the state with the data added', () => {
            state = {};
            action = ac.setCurrentUser(mockUser1);
            const result = currentUserReducer(state, action);
            expect(result).toEqual(mockUser1);
        });
    });

    describe('When the action type is not valid', () => {
        test('Then it should return the state', () => {
            state = {};
            action = { type: 'Bad', payload: 'Test' };
            const result = currentUserReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
