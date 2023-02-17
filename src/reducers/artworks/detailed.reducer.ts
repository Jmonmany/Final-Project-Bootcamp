import { Artwork } from '../../features/models/artwork.model';
import { artworksAction } from './artworks.action.creator';
import { artworkActionTypes } from './artworks.action.types';
export function detailedArtworkReducer(
    state: Artwork | object,
    action: artworksAction
): Artwork | object {
    switch (action.type) {
        case artworkActionTypes.detailed:
            const artworkDetailed = action.payload as Artwork;
            return { ...state, ...artworkDetailed };
        default:
            return state;
    }
}
