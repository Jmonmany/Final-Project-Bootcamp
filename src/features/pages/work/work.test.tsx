import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import WorkPage from './work';
describe('Given WorkPage component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(
                <Router>
                    <WorkPage></WorkPage>
                </Router>
            );
            const elementHeader = screen.getByRole('heading', {
                name: 'Artwork List',
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });
});
