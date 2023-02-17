import { Artwork } from '../../features/models/artwork.model';

export type Artworks = {
    title: string;
    url: string;
};

export type ArtworkCollection = {
    [key: string]: Artwork;
};
