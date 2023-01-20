/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import { List } from './list';
import {
    ArtworkContext,
    ArtworkContextStructure,
} from '../../context/artworks.context';
describe('Given "List" component', () => {
    const handleLoad = jest.fn();
    let mockContext: ArtworkContextStructure;
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                artworks: [],
                handleLoad,
            } as unknown as ArtworkContextStructure;
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
            expect(elementTitle).toBeInTheDocument();
        });
    });
});
