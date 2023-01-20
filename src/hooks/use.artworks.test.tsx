/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    mockArtwork1,
    mockArtwork2,
    mockAddArtwork,
    mockUpdateArtwork,
    mockValidRepoResponse,
    mockNoValidRepoResponse,
} from './testing.mock';

import { ArtworksRepo } from '../core/services/repository';
import { useArtworks } from './use.artworks';
import { ArtworksClass } from '../features/models/artwork.model';
import * as debug from '../tools/debug';
jest.mock('../core/services/repository');

ArtworksRepo.prototype.load = jest.fn();
ArtworksRepo.prototype.create = jest.fn();
ArtworksRepo.prototype.update = jest.fn();
ArtworksRepo.prototype.delete = jest.fn();
describe(`Given useArtworkss (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const {
                getStatus,
                getArtworks,
                handleLoad,
                handleAdd,
                handleUpdate,
                handleDelete,
            } = useArtworks();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mockAddArtwork)}>
                        Add
                    </button>
                    <button onClick={() => handleUpdate(mockUpdateArtwork)}>
                        Update
                    </button>
                    <button onClick={() => handleDelete(mockArtwork2.id)}>
                        Delete
                    </button>
                    {getStatus() !== 'Loaded' ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            <ul>
                                {getArtworks().map(
                                    (character: ArtworksClass) => (
                                        <li key={character.id}>
                                            {character.name}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </>
            );
        };
        render(<TestComponent />);
        buttons = screen.getAllByRole('button');
        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockValidRepoResponse);

        test('Then its function handleLoad should be add places to the state', async () => {
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
            userEvent.click(buttons[0]);
            expect(ArtworksRepo.prototype.load).toHaveBeenCalled();
            expect(
                await screen.findByText(mockArtwork1.name)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(mockArtwork2.name)
            ).toBeInTheDocument();
        });

        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            expect(ArtworksRepo.prototype.create).toHaveBeenCalled();
            expect(
                await screen.findByText(mockAddArtwork.name)
            ).toBeInTheDocument();
        });

        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            expect(ArtworksRepo.prototype.update).toHaveBeenCalled();
            expect(
                await screen.findByText(mockUpdateArtwork.name)
            ).toBeInTheDocument();
        });

        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[0]);
            expect(ArtworksRepo.prototype.load).toHaveBeenCalled();
            userEvent.click(buttons[3]);
            expect(ArtworksRepo.prototype.delete).toHaveBeenCalled();
            expect(
                await screen.findByText(mockArtwork2.name)
            ).toBeInTheDocument();

            await expect(
                async () => await screen.findByText(mockArtwork1.name)
            ).rejects.toThrowError();
        });
    });
    describe(`When the repo is NOT working OK`, () => {
        beforeEach(mockNoValidRepoResponse);
        test('Then its function handleLoad should be used', async () => {
            userEvent.click(buttons[0]);
            expect(ArtworksRepo.prototype.load).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[1]);
            expect(ArtworksRepo.prototype.create).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[2]);
            expect(ArtworksRepo.prototype.update).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[3]);
            expect(ArtworksRepo.prototype.delete).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
    });
});
