/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { MemoryRouter as Router } from 'react-router';
import { USER } from '../../../features/data/usermock';
import {
    ArtworkContextStructure,
    UserContextStructure,
    ArtworkContext,
} from '../../context/artworks.context';
import { Header } from './header';
jest.mock('../../../config.ts');
describe('Given Header component', () => {
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const handleCurrentUser = jest.fn();
    describe('When renders without current User', () => {
        beforeEach(async () => {
            mockContext = {
                handleCurrentUser,
                currentUser: {},
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Header>
                                <></>
                            </Header>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test('Then elements should be in the screen', () => {
            const elementTitle = screen.getByRole('heading', {
                name: 'Marina Labella',
            });
            const elementSubtitle = screen.getByRole('heading', {
                name: 'ILLUSTRATION',
            });
            const loginBtn = screen.getByRole('button', {
                name: 'Log in',
            });
            expect(elementTitle).toBeInTheDocument();
            expect(elementSubtitle).toBeInTheDocument();
            expect(loginBtn).toBeInTheDocument();
        });
        test('Then on click login button should navigate to Login', () => {
            const navigate = jest.fn();
            const currentUser = {};
            const loginBtn = screen.getByRole('button', {
                name: 'Log in',
            });
            userEvent.click(loginBtn);
            renderHook(() =>
                useEffect(() => {
                    if (Object.keys(currentUser).length === 0) {
                        navigate('/login');
                    }
                }, [])
            );
            expect(navigate).toHaveBeenCalledWith('/login');
        });
    });
    describe('When Header components renders with current User', () => {
        beforeEach(async () => {
            mockContext = {
                currentUser: USER,
                handleCurrentUser,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Header>
                                <></>
                            </Header>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test('Then the button should be in the screen', () => {
            const loginOutBtn = screen.getByRole('button', {
                name: 'Log out',
            });
            expect(loginOutBtn).toBeInTheDocument();
        });
        test('Then on click login button should navigate to Login', () => {
            const loginBtn = screen.getByRole('button', {
                name: 'Log out',
            });
            userEvent.click(loginBtn);
            expect(handleCurrentUser).toHaveBeenCalled();
        });
    });
});
