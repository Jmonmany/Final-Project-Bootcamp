/* eslint-disable testing-library/no-unnecessary-act */
import { render, act, screen } from '@testing-library/react';
import { ARTWORK } from '../../../features/data/artmock';
import { MemoryRouter as Router } from 'react-router';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../../core/context/artworks.context';
import Details from './details';
import userEvent from '@testing-library/user-event';

describe('Given "Detail" component', () => {
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const artworkDetailed = ARTWORK;
    const handleUpdate = jest.fn();
    describe('When it is instantiated without admin', () => {
        beforeEach(async () => {
            mockContext = {
                getAdmin: () => false,
                handleUpdate,
                artworkDetailed,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Details></Details>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render elements`, async () => {
            const title = screen.getByRole('heading', {
                name: artworkDetailed.title,
            });
            const link = screen.getByRole('link', {
                name: artworkDetailed.link,
            });
            expect(title).toBeInTheDocument();
            expect(link).toBeInTheDocument();
        });
    });
    describe('When it is instantiated with admin', () => {
        const mockTitle = '12345';
        const mockDescription = 'Test description';
        const mockLinkTag = 'Test Link Tag';
        const mockLink = 'Test Link';
        let inputElementsTxt: Array<HTMLElement>;
        beforeEach(async () => {
            mockContext = {
                getAdmin: () => true,
                handleUpdate,
                artworkDetailed,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Details></Details>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
            inputElementsTxt = screen.getAllByRole('textbox');
        });
        test(`Then component should be render elements`, async () => {
            expect(inputElementsTxt[0]).toBeInTheDocument();
            expect(inputElementsTxt[1]).toBeInTheDocument();
            expect(inputElementsTxt[2]).toBeInTheDocument();
            expect(inputElementsTxt[3]).toBeInTheDocument();
        });
        test('Then form could be used for type content', () => {
            userEvent.type(inputElementsTxt[0], mockTitle);
            userEvent.type(inputElementsTxt[1], mockDescription);
            userEvent.type(inputElementsTxt[2], mockLinkTag);
            userEvent.type(inputElementsTxt[3], mockLink);
            expect(inputElementsTxt[0]).toHaveValue(
                artworkDetailed.title + mockTitle
            );
            expect(inputElementsTxt[1]).toHaveValue(
                artworkDetailed.description + mockDescription
            );
            expect(inputElementsTxt[2]).toHaveValue(
                artworkDetailed.linkTag + mockLinkTag
            );
            expect(inputElementsTxt[3]).toHaveValue(
                artworkDetailed.link + mockLink
            );
        });
        test(`Then component should call context functions`, async () => {
            const submitBtn = screen.getByRole('button', {
                name: 'Submit',
            });
            expect(submitBtn).toBeInTheDocument();
            userEvent.click(submitBtn);
            expect(handleUpdate).toHaveBeenCalled();
        });
    });
});
