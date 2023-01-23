import { render, screen } from '@testing-library/react';
import { Address } from './address';
describe('Given Address component', () => {
    describe('When it has been render', () => {
        test('Then the list should be in the screen', () => {
            render(<Address />);
            const element = screen.getByRole('list');
            expect(element).toBeInTheDocument();
        });
    });
});
