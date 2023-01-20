import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import Contact from './contact';
describe('Given Contact component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(
                <Router>
                    <Contact></Contact>
                </Router>
            );
            const div = screen.getByRole('article');
            expect(div).toBeInTheDocument();
        });
    });
});
