/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { USER } from '../../../features/data/usermock';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../context/artworks.context';
import { ArtistContact } from './artist.contact';

describe('Given "ArtistContact" component', () => {
    describe('When component is call without any log in', () => {
        const handleUpdateUser = jest.fn();
        let mockContext: ArtworkContextStructure & UserContextStructure;
        beforeEach(async () => {
            mockContext = {
                admin: false,
                currentUser: {},
                handleUpdateUser,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <ArtistContact></ArtistContact>
                    </ArtworkContext.Provider>
                );
            });
        });
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
    describe('When data is provided on form', () => {
        const handleUpdateUser = jest.fn();
        let mockContext: ArtworkContextStructure & UserContextStructure;
        beforeEach(async () => {
            mockContext = {
                admin: false,
                currentUser: USER,
                handleUpdateUser,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <ArtistContact></ArtistContact>
                    </ArtworkContext.Provider>
                );
            });
        });
        const mockPhone = '12345';
        const mockAddress = 'Test address';
        const mockSubject = 'Test subject';
        const mockDescription = 'Test description';
        let inputElementsTxt: Array<HTMLElement>;
        beforeEach(() => {
            inputElementsTxt = screen.getAllByRole('textbox');
        });
        test('Then form could be used for type content', () => {
            const title = screen.getByRole('heading', {
                name: `Let's talk`,
            });
            expect(title).toBeInTheDocument();
            expect(inputElementsTxt[0]).toBeInTheDocument();
            expect(inputElementsTxt[1]).toBeInTheDocument();
            expect(inputElementsTxt[2]).toBeInTheDocument();
            expect(inputElementsTxt[3]).toBeInTheDocument();
            expect(inputElementsTxt[4]).toBeInTheDocument();
            expect(inputElementsTxt[5]).toBeInTheDocument();
            userEvent.type(inputElementsTxt[2], mockPhone);
            userEvent.type(inputElementsTxt[3], mockAddress);
            userEvent.type(inputElementsTxt[4], mockSubject);
            userEvent.type(inputElementsTxt[5], mockDescription);
            expect(inputElementsTxt[2]).toHaveValue(mockPhone);
            expect(inputElementsTxt[3]).toHaveValue(mockAddress);
            expect(inputElementsTxt[4]).toHaveValue(mockSubject);
            expect(inputElementsTxt[5]).toHaveValue(mockDescription);
        });
        test('Then the button should be in the screen', () => {
            const submitButton = screen.getByRole('button', { name: 'Submit' });
            expect(submitButton).toBeInTheDocument();
            userEvent.click(submitButton);
            expect(handleUpdateUser).toHaveBeenCalled();
        });
    });
});
