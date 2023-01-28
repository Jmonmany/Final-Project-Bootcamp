import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './login';

describe('Given "Login" component', () => {
    beforeEach(() => {
        render(<Login></Login>);
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
        test('Then buttons should be in the screen', () => {
            const submitButton = screen.getByRole('button', { name: 'Submit' });
            const googleButton = screen.getByRole('button', {
                name: 'Sign in with Google',
            });
            expect(submitButton).toBeInTheDocument();
            expect(googleButton).toBeInTheDocument();
        });
    });
});
