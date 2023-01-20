import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
describe('Given Footer component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(<Footer />);
            const elementHeader = screen.getByRole('contentinfo', {
                name: 'footer',
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });
});
