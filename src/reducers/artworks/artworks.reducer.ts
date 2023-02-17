import { Artwork } from '../../features/models/artwork.model';
import { artworksAction } from './artworks.action.creator';
import { artworkActionTypes } from './artworks.action.types';
export function artworksReducer(
    state: Array<Artwork>,
    action: artworksAction
): Array<Artwork> {
    switch (action.type) {
        case artworkActionTypes.load:
            return action.payload as Array<Artwork>;
        case artworkActionTypes.add:
            return [
                ...(state as Array<Artwork>),
                action.payload as Artwork,
            ];
        case artworkActionTypes.update:
            const updateArtwork = action.payload as Artwork;
            return (state as Array<Artwork>).map((item) =>
                item.id === updateArtwork.id ? updateArtwork : item
            );
        case artworkActionTypes.delete:
            const finalId = action.payload as Artwork['id'];
            return state.filter((item) => item.id !== finalId);
        case artworkActionTypes.reshuffle:
            return [
                ...state,
                ...(action.payload as Array<Artwork>),
            ];
        default:
            return [...state];
    }
}
