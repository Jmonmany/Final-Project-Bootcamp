import { ArtworksClass } from '../../features/models/artwork.model';
import { artworksAction } from './artworks.action.creator';
import { artworkActionTypes } from './artworks.action.types';
export function detailedArtworkReducer(
    state: ArtworksClass | object,
    action: artworksAction
): ArtworksClass | object {
    switch (action.type) {
        case artworkActionTypes.detailed:
            const artworkDetailed = action.payload as ArtworksClass;
            return { ...state, ...artworkDetailed };
        default:
            return state;
    }
}
