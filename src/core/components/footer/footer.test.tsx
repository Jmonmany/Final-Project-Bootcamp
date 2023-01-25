import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
describe('Given Footer component', () => {
    describe('When it has been render', () => {
        test('Then the footer should be in the screen', () => {
            render(<Footer />);
            const elementHeader = screen.getByRole('contentinfo', {
                name: 'footer',
            });
            expect(elementHeader).toBeInTheDocument();
        });
        test('Then the copyright should be in the screen', () => {
            render(<Footer />);
            const text = screen.getByText('©2023 by Marina Labella.');
            expect(text).toBeInTheDocument();
        });
    });
});
