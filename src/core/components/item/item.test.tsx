/* eslint-disable testing-library/no-unnecessary-act */
import { render, act } from '@testing-library/react';
import { Item } from './item';
import {
    ArtworkContext,
    ArtworkContextStructure,
} from '../../context/artworks.context';
import { ARTWORK } from '../../../features/data/artmock';
describe('Given "Item" component', () => {
    const handleLoad = jest.fn();
    let mockContext: ArtworkContextStructure;
    const item = ARTWORK
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                artworks: [],
                handleLoad,
            } as unknown as ArtworkContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Item item={item}></Item>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render the loading`, () => {
            //
        });
    });
});
