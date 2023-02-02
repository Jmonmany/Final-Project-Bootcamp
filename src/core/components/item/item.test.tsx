/* eslint-disable testing-library/no-unnecessary-act */
import { render, act, screen } from '@testing-library/react';
import { Item } from './item';
import {
    ArtworkContext,
    ArtworkContextStructure,
    UserContextStructure,
} from '../../context/artworks.context';
import { ARTWORK } from '../../../features/data/artmock';
describe('Given "Item" component', () => {
    const handleLoad = jest.fn();
    const getAdmin = () => true
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const item = ARTWORK
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                artworks: [],
                getAdmin,
                handleLoad,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Item item={item}></Item>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render the buttons`, () => {
            const buttons = screen.getAllByRole('button')
            expect(buttons[0]).toBeInTheDocument()
            expect(buttons[1]).toBeInTheDocument();
        });
    });
});
