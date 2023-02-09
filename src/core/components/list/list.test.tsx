/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { List } from './list';
import {
    ArtworkContext,
    ArtworkContextStructure,
    UserContextStructure,
} from '../../context/artworks.context';
import { ARTWORK, ARTWORK2, ARTWORK3 } from '../../../features/data/artmock';
import userEvent from '@testing-library/user-event';
describe('Given "List" component', () => {
    const handleLoad = jest.fn();
    const handleAdd = jest.fn();
    const getAdmin = jest.fn();
    const reShuffleArtworks = jest.fn();
    let mockContext: ArtworkContextStructure & UserContextStructure;
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                artworks: [ARTWORK, ARTWORK2, ARTWORK3],
                getAdmin,
                handleAdd,
                handleLoad,
                reShuffleArtworks,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <List></List>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render the loading`, () => {
            const elementTitle = screen.getByRole('heading', {
                name: 'Artwork List',
            });
            const addBtn = screen.getByRole('button', {
                name: 'ADD ARTWORK',
            });
            userEvent.click(addBtn);
            expect(handleAdd).toHaveBeenCalled();
            expect(elementTitle).toBeInTheDocument();
            expect(addBtn).toBeInTheDocument();
        });
        test(`Then component should be render the item`, () => {
            const altElements1 = screen.getByAltText('mockArt1');
            const altElements2 = screen.getByAltText('mockArt2');
            const altElements3 = screen.getByAltText('mockArt3');
            expect(altElements1).toBeInTheDocument();
            expect(altElements2).toBeInTheDocument();
            expect(altElements3).toBeInTheDocument();
        });
        test('should allow dragging and dropping artworks', async () => {
            const altElements1 = screen.getByAltText('mockArt1');
            const altElements2 = screen.getByAltText('mockArt2');
            act(() => {
                fireEvent.dragStart(altElements1, {
                    clientX: 0,
                    clientY: 0,
                });
            });
            act(() => {
                fireEvent.dragEnter(altElements2, {
                    clientX: 0,
                    clientY: 0,
                });
            });
            act(() => {
                fireEvent.dragEnd(altElements2, {
                    clientX: 0,
                    clientY: 0,
                });
            });

            expect(reShuffleArtworks).toHaveBeenCalledWith([
                ARTWORK2,
                ARTWORK,
                ARTWORK3,
            ]);
        });
    });
});
