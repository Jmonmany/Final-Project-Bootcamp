import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import About from './about';
describe('Given About component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(
                <Router>
                    <About></About>
                </Router>
            );
            const div = screen.getByRole('article');
            expect(div).toBeInTheDocument();
        });
    });
});
