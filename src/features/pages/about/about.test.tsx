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
            const title = screen.getByRole('heading', {
                name: 'About Me',
            });
            expect(title).toBeInTheDocument();
        });
        test('Then the image should be in the screen', () => {
            render(
                <Router>
                    <About></About>
                </Router>
            );
            const altElement = screen.getByAltText('Marina Labella');
            expect(altElement).toBeInTheDocument();
        });
    });
});
