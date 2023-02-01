/* eslint-disable testing-library/no-unnecessary-act */
import { render, act, screen } from '@testing-library/react';
import {
    ArtworkContext,
    ArtworkContextStructure,
    UserContextStructure,
} from '../../context/artworks.context';
import { USER } from '../../../features/data/usermock';
import { Card } from './card';
import userEvent from '@testing-library/user-event';
describe('Given "Card" component', () => {
    const handleUpdateUser = jest.fn();
    const handleDeleteCard = jest.fn();
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const sample = USER;
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                handleUpdateUser,
                handleDeleteCard,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Card item={sample}></Card>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render the data`, () => {
            const trashBtn = screen.getByRole('button', {
                name: 'trash',
            });
            expect(trashBtn).toBeInTheDocument();
            userEvent.click(trashBtn);
            expect(handleDeleteCard).toHaveBeenCalled();
            expect(handleUpdateUser).toHaveBeenCalled();
        });
    });
});
