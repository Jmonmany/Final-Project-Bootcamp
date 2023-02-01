import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router';
import { Header } from './header';
jest.mock('../../../config.ts');
describe('Given Header component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(
                <Router>
                    <Header>
                        <></>
                    </Header>
                </Router>
            );
            const elementTitle = screen.getByRole('heading', {
                name: 'Marina Labella',
            });
            const elementSubtitle = screen.getByRole('heading', {
                name: 'ILLUSTRATION',
            });
            const loginBtn = screen.getByRole('button', {
                name: 'Log in',
            });
            expect(elementTitle).toBeInTheDocument();
            expect(elementSubtitle).toBeInTheDocument();
            expect(loginBtn).toBeInTheDocument();
            userEvent.click(loginBtn);
            const loginOutBtn = screen.getByRole('button', {
                name: 'Log out',
            });
            expect(loginOutBtn).toBeInTheDocument();

        });
    });
});
