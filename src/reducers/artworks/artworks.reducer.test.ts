import {
    mockArtwork1,
    mockArtwork2,
    mockArtworks,
} from '../../hooks/artworks/testing.mock';
import { ArtworksClass } from '../../features/models/artwork.model';
import { artworksAction } from './artworks.action.creator';
import * as ac from './artworks.action.creator';
import { artworksReducer } from './artworks.reducer';
import { ARTWORK } from '../../features/data/artmock';

describe('Given the reducer', () => {
    let state: Array<ArtworksClass>;
    let action: artworksAction;

    describe('When the action type is "artworks@load"', () => {
        test('Then it should return as state the loaded data', () => {
            state = [];
            action = ac.artworksLoadCreator(mockArtworks);
            const result = artworksReducer(state, action);
            expect(result).toEqual(mockArtworks);
        });
    });

    describe('When the action type is "artworks@add"', () => {
        test('Then it should return the state with the data added', () => {
            state = [mockArtwork1];
            action = ac.artworksAddCreator(mockArtwork2);
            const result = artworksReducer(state, action);
            expect(result).toEqual([mockArtwork1, mockArtwork2]);
        });
    });

    describe('When the action type is "artworks@update"', () => {
        test('Then it should return the state with th data updated', () => {
            const updateartwork = {
                ...ARTWORK,
                name: 'Pepe',
                death: function (): void {
                    throw new Error('Function not implemented.');
                },
            };
            state = [ARTWORK, mockArtwork2];
            action = ac.artworksUpdateCreator(updateartwork);
            const result = artworksReducer(state, action);
            expect(result).toEqual([updateartwork, mockArtwork2]);
        });
    });

    describe('When the action type is "artworks@delete"', () => {
        test('Then it should return the state without the data deleted', () => {
            state = [mockArtwork1];
            action = ac.artworksDeleteCreator(mockArtwork1.id);
            const result = artworksReducer(state, action);
            expect(result).toEqual([]);
        });
    });

    describe('When the action type is "artworks@reshuffle"', () => {
        test('Then it should return as state the loaded data', () => {
            state = [];
            action = ac.artworksReShuffleCreator(mockArtworks);
            const result = artworksReducer(state, action);
            expect(result).toEqual(mockArtworks);
        });
    });

    describe('When the action type is not valid', () => {
        test('Then it should return the state', () => {
            state = [];
            action = { type: 'Bad', payload: 'Test' };
            const result = artworksReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
