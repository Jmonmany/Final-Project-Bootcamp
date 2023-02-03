/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../context/artworks.context';
import { Login } from './login';
import { login, loginWithGoogle } from '../../../config';
jest.mock('../../../config');

describe('Given "Login" component', () => {
    const handleUser = jest.fn();
    const handleAdmin = jest.fn();
    let mockContext: ArtworkContextStructure & UserContextStructure;

    beforeEach(async () => {
        mockContext = {
            handleUser,
            handleAdmin,
        } as unknown as ArtworkContextStructure & UserContextStructure;
        await act(async () => {
            render(
                <ArtworkContext.Provider value={mockContext}>
                    <Login></Login>
                </ArtworkContext.Provider>
            );
        });
    });

    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with its title`, () => {
            const addTitle = screen.getByRole('heading', {
                name: 'Log in',
            });
            expect(addTitle).toBeInTheDocument();
        });
    });

    describe('When data is provided on form', () => {
        const mockEmail = 'Test email';
        const mockPassword = '12345';
        let inputElementsTxt: Array<HTMLElement>;

        beforeEach(() => {
            inputElementsTxt = screen.getAllByRole('textbox');
        });
        test('Then form could be used for type content', () => {
            expect(inputElementsTxt[0]).toBeInTheDocument();
            expect(inputElementsTxt[1]).toBeInTheDocument();
            userEvent.type(inputElementsTxt[0], mockEmail);
            userEvent.type(inputElementsTxt[1], mockPassword);
            expect(inputElementsTxt[0]).toHaveValue(mockEmail);
            expect(inputElementsTxt[1]).toHaveValue(mockPassword);
        });
        test('Then buttons should be in the screen', async () => {
            (login as jest.Mock).mockResolvedValue({
                user: {
                    uid: '12345',
                },
            });
            const submitButton = screen.getByRole('button', { name: 'Submit' });
            expect(submitButton).toBeInTheDocument();
            userEvent.click(submitButton);
            expect(login).toHaveBeenCalled();
            // to be tested
            // expect(handleAdmin).toHaveBeenCalled();
        });
        test('Then buttons google should be in the screen', async () => {
            (loginWithGoogle as jest.Mock).mockResolvedValue({
                name: 'sample',
                email: 'sample@gmail.com',
                getIdToken: '12345',
                uid: '12345',
            });
            const googleButton = screen.getByRole('button', {
                name: 'Sign in with Google',
            });
            expect(googleButton).toBeInTheDocument();
            userEvent.click(googleButton);
            expect(loginWithGoogle).toHaveBeenCalled();
            // to be tested
            // expect(handleUser).toHaveBeenCalled();
        });
    });
});
