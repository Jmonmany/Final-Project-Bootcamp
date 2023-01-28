import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArtistContact } from './artist.contact';

describe('Given "ArtistContact" component', () => {
    beforeEach(() => {
        render(<ArtistContact></ArtistContact>);
    });

    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with its title`, () => {
            const addTitle = screen.getByRole('heading', {
                name: `Let's talk`,
            });
            expect(addTitle).toBeInTheDocument();
        });
    });

    describe('When data is provided on form', () => {
        const mockName = 'Henry';
        const mockEmail = 'henry@gamil.com';
        const mockPhone = '12345';
        const mockAddress = 'Test address';
        const mockSubject = 'Test subject';
        const mockDescription = 'Test description';
        let inputElementsTxt: Array<HTMLElement>;
        beforeEach(() => {
            inputElementsTxt = screen.getAllByRole('textbox');
        });
        test('Then form could be used for type content', () => {
            expect(inputElementsTxt[0]).toBeInTheDocument();
            expect(inputElementsTxt[1]).toBeInTheDocument();
            expect(inputElementsTxt[2]).toBeInTheDocument();
            expect(inputElementsTxt[3]).toBeInTheDocument();
            expect(inputElementsTxt[4]).toBeInTheDocument();
            expect(inputElementsTxt[5]).toBeInTheDocument();
            userEvent.type(inputElementsTxt[0], mockName);
            userEvent.type(inputElementsTxt[1], mockEmail);
            userEvent.type(inputElementsTxt[2], mockPhone);
            userEvent.type(inputElementsTxt[3], mockAddress);
            userEvent.type(inputElementsTxt[4], mockSubject);
            userEvent.type(inputElementsTxt[5], mockDescription);
            expect(inputElementsTxt[0]).toHaveValue(mockName);
            expect(inputElementsTxt[1]).toHaveValue(mockEmail);
            expect(inputElementsTxt[2]).toHaveValue(mockPhone);
            expect(inputElementsTxt[3]).toHaveValue(mockAddress);
            expect(inputElementsTxt[4]).toHaveValue(mockSubject);
            expect(inputElementsTxt[5]).toHaveValue(mockDescription);
        });
        test('Then the button should be in the screen', () => {
            const submitButton = screen.getByRole('button', { name: 'Submit' });
            expect(submitButton).toBeInTheDocument();
        });
    });
});
