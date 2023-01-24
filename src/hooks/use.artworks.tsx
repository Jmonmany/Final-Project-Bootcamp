/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useReducer, useState } from 'react';
import { ArtworksRepo } from '../core/services/repository';
import { artworksReducer } from '../reducer/reducer';
import * as ac from '../reducer/action.creator';
import { consoleDebug } from '../tools/debug';
import { ArtworksClass } from '../features/models/artwork.model';
import { storage } from '../config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export type useArtworksType = {
    handleFile: (ev: any) => void;
    getStatus: () => Status;
    getArtworks: () => Array<ArtworksClass>;
    handleLoad: () => Promise<void>;
    handleAdd: (artworks: ArtworksClass) => Promise<void>;
    handleUpdate: (artworksPayload: Partial<ArtworksClass>) => Promise<void>;
    handleDelete: (id: ArtworksClass['id']) => Promise<void>;
};

type Status = 'Starting' | 'Loading' | 'Loaded';

export function useArtworks(): useArtworksType {
    const repo = useMemo(() => new ArtworksRepo(), []);

    const initialState: Array<ArtworksClass> = [];
    const initialStatus = 'Starting' as Status;
    const [artworks, dispatch] = useReducer(artworksReducer, initialState);

    const [status, setStatus] = useState(initialStatus);
    const getArtworks = () => artworks;
    const getStatus = () => status;

    const handleFile = async (ev: any) => {
        ev.preventDefault();
        const input: any = ev.target.getFile.files[0];
        if (input === undefined) {
            alert('Any file selected');
            return;
        }
        const artworkRef = ref(storage, input.name);
        await uploadBytes(artworkRef, input);
        const url = await getDownloadURL(artworkRef);
        const artworkData = new ArtworksClass(input.name, url);
        handleAdd(artworkData);
    };

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            dispatch(ac.artworksLoadCreator(data));
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAdd = async function (artworks: ArtworksClass) {
        try {
            const fullArtworks = await repo.create(artworks);
            dispatch(ac.artworksAddCreator(fullArtworks));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (
        artworksPayload: Partial<ArtworksClass>
    ) {
        try {
            const fullArtworks = await repo.update(artworksPayload);
            dispatch(ac.artworksUpdateCreator(fullArtworks));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (id: ArtworksClass['id']) {
        try {
            const finalId = await repo.delete(id);
            dispatch(ac.artworksDeleteCreator(finalId));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        handleFile,
        getStatus,
        getArtworks,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
}
