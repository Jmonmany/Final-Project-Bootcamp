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

describe('Given "Detail" component', () => {
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const artworkDetailed = ARTWORK;
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
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
            expect(title).toBeInTheDocument();
        });
    });
});
