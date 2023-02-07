import { ArtworksClass } from '../../features/models/artwork.model';
import { artworksAction } from './artworks.action.creator';
import { artworkActionTypes } from './artworks.action.types';
export function artworksReducer(
    state: Array<ArtworksClass>,
    action: artworksAction
): Array<ArtworksClass> {
    switch (action.type) {
        case artworkActionTypes.load:
            return action.payload as Array<ArtworksClass>;
        case artworkActionTypes.add:
            return [
                ...(state as Array<ArtworksClass>),
                action.payload as ArtworksClass,
            ];
        case artworkActionTypes.update:
            const updateArtwork = action.payload as ArtworksClass;
            return (state as Array<ArtworksClass>).map((item) =>
                item.id === updateArtwork.id ? updateArtwork : item
            );
        case artworkActionTypes.delete:
            const finalId = action.payload as ArtworksClass['id'];
            return state.filter((item) => item.id !== finalId);
        case artworkActionTypes.reshuffle:
            return [
                ...(state as Array<ArtworksClass>),
                ...(action.payload as Array<ArtworksClass>),
            ];
        default:
            return [...state];
    }
}
