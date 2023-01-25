import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { Header } from './header';
jest.mock('../../../config.ts')
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
            expect(elementTitle).toBeInTheDocument();
            expect(elementSubtitle).toBeInTheDocument();
        });
    });
});
