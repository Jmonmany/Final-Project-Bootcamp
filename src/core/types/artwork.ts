import { ArtworksClass } from "../../features/models/artwork.model";

export type ArtworkType = {
    title: string;
    url: string;
};

export type ArtworCollection = {
    [key: string]: ArtworksClass;
};

