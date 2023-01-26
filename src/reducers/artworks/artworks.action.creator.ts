import { ArtworksClass } from '../../features/models/artwork.model';
import { artworkActionTypes } from '../../reducers/artworks/artworks.action.types';

export type artworksAction = {
    type: string;
    payload: Array<ArtworksClass> | ArtworksClass | ArtworksClass['id'];
};

export const artworksLoadCreator = (
    payload: Array<ArtworksClass>
): artworksAction => ({
    type: artworkActionTypes.load,
    payload,
});

export const artworksAddCreator = (
    payload: ArtworksClass
): artworksAction => ({
    type: artworkActionTypes.add,
    payload,
});

export const artworksUpdateCreator = (
    payload: ArtworksClass
): artworksAction => ({
    type: artworkActionTypes.update,
    payload,
});

export const artworksDeleteCreator = (
    payload: ArtworksClass['id']
): artworksAction => ({
    type: artworkActionTypes.delete,
    payload,
});
