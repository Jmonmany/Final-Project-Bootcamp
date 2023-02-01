import { render, screen } from '@testing-library/react';
import { ArtistContact } from './artist.contact';

describe('Given "ArtistContact" component', () => {
    beforeEach(() => {
        render(<ArtistContact></ArtistContact>);
    });

    describe('When component is call without any log in', () => {
        test(`Then it should be render a text and Login component`, () => {
            const text = screen.getByRole('heading', {
                name: `Before contacting us please register quickly, it only takes one click!`,
            });
            const login = screen.getByRole('heading', {
                name: `Log in`,
            });
            expect(text).toBeInTheDocument();
            expect(login).toBeInTheDocument();
        });
    });

    // describe('When data is provided on form', () => {
    //     const mockName = 'Henry';
    //     const mockEmail = 'henry@gamil.com';
    //     const mockPhone = '12345';
    //     const mockAddress = 'Test address';
    //     const mockSubject = 'Test subject';
    //     const mockDescription = 'Test description';
    //     let inputElementsTxt: Array<HTMLElement>;
    //     beforeEach(() => {
    //         inputElementsTxt = screen.getAllByRole('textbox');
    //         const blabla = screen.getByRole('textbox', {
    //             name: 'bla'
    //         })
    //     });
    //     test('Then form could be used for type content', () => {
            
    //         expect(inputElementsTxt[0]).toBeInTheDocument();
    //         expect(inputElementsTxt[1]).toBeInTheDocument();
    //         expect(inputElementsTxt[2]).toBeInTheDocument();
    //         expect(inputElementsTxt[3]).toBeInTheDocument();
    //         expect(inputElementsTxt[4]).toBeInTheDocument();
    //         expect(inputElementsTxt[5]).toBeInTheDocument();
    //         userEvent.type(inputElementsTxt[0], mockName);
    //         userEvent.type(inputElementsTxt[1], mockEmail);
    //         userEvent.type(inputElementsTxt[2], mockPhone);
    //         userEvent.type(inputElementsTxt[3], mockAddress);
    //         userEvent.type(inputElementsTxt[4], mockSubject);
    //         userEvent.type(inputElementsTxt[5], mockDescription);
    //         expect(inputElementsTxt[0]).toHaveValue(mockName);
    //         expect(inputElementsTxt[1]).toHaveValue(mockEmail);
    //         expect(inputElementsTxt[2]).toHaveValue(mockPhone);
    //         expect(inputElementsTxt[3]).toHaveValue(mockAddress);
    //         expect(inputElementsTxt[4]).toHaveValue(mockSubject);
    //         expect(inputElementsTxt[5]).toHaveValue(mockDescription);
    //     });
    //     test('Then the button should be in the screen', () => {
    //         const submitButton = screen.getByRole('button', { name: 'Submit' });
    //         expect(submitButton).toBeInTheDocument();
    //     });
    // });
});
