/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { useArtworksType } from '../../hooks/use.artworks';
import {
    ArtworksClass,
    ArtworkModel,
} from '../../features/models/artwork.model';

export type ArtworkContextStructure = Omit<
    useArtworksType,
    'getStatus' | 'getArtworks'
> & {
    artworks: Array<ArtworksClass>;
};

export const initialContext: ArtworkContextStructure = {
    artworks: [],
    handleLoad: async () => {},
    handleAdd: async (artworks: ArtworkModel) => {},
    handleDelete: async (id: string) => {},
    handleUpdate: async (artworksPayload: Partial<ArtworksClass>) => {},
};

export const ArtworkContext = createContext(initialContext);
