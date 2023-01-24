/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { useArtworksType } from '../../hooks/use.artworks';
import {
    ArtworksClass
} from '../../features/models/artwork.model';
import { ArtworkType } from '../types/artwork';

export type ArtworkContextStructure = Omit<
    useArtworksType,
    'getStatus' | 'getArtworks'
> & {
    artworks: Array<ArtworksClass>;
};

export const initialContext: ArtworkContextStructure = {
    artworks: [],
    handleFile: () => {},
    handleLoad: async () => {},
    handleAdd: async (artworks: ArtworkType) => {},
    handleDelete: async (id: string) => {},
    handleUpdate: async (artworksPayload: Partial<ArtworksClass>) => {},
};

export const ArtworkContext = createContext(initialContext);
