/* eslint-disable testing-library/no-unnecessary-act */
import userEvent from '@testing-library/user-event';
import { render, act, screen } from '@testing-library/react';
import { ARTWORK } from '../../../features/data/artmock';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../context/artworks.context';
import { Details } from './details';

describe('Given "Detail" component', () => {
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const item = ARTWORK;
    describe('When it is initially instantiated without data', () => {
        const handleDetailed = jest.fn();
        beforeEach(async () => {
            mockContext = {
                handleDetailed,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Details item={item}></Details>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render elements`, async () => {
            const button = screen.getByRole('button', {
                name: 'cancel',
            });
            const title = screen.getByRole('heading', {
                name: item.title,
            });
            expect(button).toBeInTheDocument();
            expect(title).toBeInTheDocument();
        });
        test(`Then should use button`, async () => {
            const button = screen.getByRole('button', {
                name: 'cancel',
            });
            userEvent.click(button);
            expect(handleDetailed).toHaveBeenCalled()
        });
    });
});
