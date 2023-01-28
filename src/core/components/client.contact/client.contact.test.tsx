import { render, screen } from '@testing-library/react';
import { ClientContact } from './client.contact';

describe('Given "ClientContact" component', () => {
    beforeEach(() => {
        render(<ClientContact></ClientContact>);
    });

    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with its title`, () => {
            const addTitle = screen.getByRole('heading', {
                name: 'Manage who contacts you',
            });
            expect(addTitle).toBeInTheDocument();
        });
    });
});
