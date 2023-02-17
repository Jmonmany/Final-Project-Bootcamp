import { Artwork } from "../../features/models/artwork.model";
import { mockArtwork1 } from "../../hooks/artworks/testing.mock";
import * as ac from './artworks.action.creator';
import { artworksAction } from "./artworks.action.creator";
import { detailedArtworkReducer } from "./detailed.reducer";

describe('Given the reducer', () => {
    let state: Artwork | object;
    let action: artworksAction;
    describe('When the action type is "users@setCurrent"', () => {
        test('Then it should return the state with the data added', () => {
            state = {};
            action = ac.artworksDetailedCreator(mockArtwork1);
            const result = detailedArtworkReducer(state, action);
            expect(result).toEqual(mockArtwork1);
        });
    });

    describe('When the action type is not valid', () => {
        test('Then it should return the state', () => {
            state = {};
            action = { type: 'Bad', payload: 'Test' };
            const result = detailedArtworkReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
