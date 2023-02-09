/* eslint-disable testing-library/no-unnecessary-act */
import { render, act, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { Item } from './item';
import {
    ArtworkContext,
    ArtworkContextStructure,
    UserContextStructure,
} from '../../context/artworks.context';
import { ARTWORK } from '../../../features/data/artmock';
import userEvent from '@testing-library/user-event';
describe('Given "Item" component', () => {
    const handleLoad = jest.fn();
    const handleDetailed = jest.fn();
    const onDragStart = jest.fn();
    const onDragEnter = jest.fn();
    const onDragEnd = jest.fn();
    const getAdmin = () => true;
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const item = ARTWORK;
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                artworks: [],
                getAdmin,
                handleLoad,
                handleDetailed,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Item
                                item={item}
                                dragStart={onDragStart}
                                dragEnter={onDragEnter}
                                dragEnd={onDragEnd}
                            ></Item>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render the buttons`, () => {
            const buttons = screen.getAllByRole('button');
            const img = screen.getByRole('img', {
                name: item.title
            })
            expect(buttons[0]).toBeInTheDocument();
            expect(buttons[1]).toBeInTheDocument();
            expect(img).toBeInTheDocument();
        });
        test(`Then component should be use the click`, () => {
            const img = screen.getByRole('img', {
                name: item.title,
            });
            userEvent.click(img)
            expect(handleDetailed).toHaveBeenCalled()
        });
    });
});
