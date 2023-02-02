/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
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
    let mockContext: ArtworkContextStructure & UserContextStructure;
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                artworks: [ARTWORK, ARTWORK2, ARTWORK3],
                getAdmin,
                handleAdd,
                handleLoad,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <List></List>
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
            userEvent.click(addBtn)
            expect(handleAdd).toHaveBeenCalled()
            expect(elementTitle).toBeInTheDocument();
            expect(addBtn).toBeInTheDocument();
        });
        test(`Then component should be render the item`, () => {
            const altElements1 = screen.getByAltText('mock1');
            const altElements2 = screen.getByAltText('mock1');
            const altElements3 = screen.getByAltText('mock1');
            expect(altElements1).toBeInTheDocument();
            expect(altElements2).toBeInTheDocument();
            expect(altElements3).toBeInTheDocument();
        });
    });
});
