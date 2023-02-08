/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    SyntheticEvent,
    useCallback,
    useMemo,
    useReducer,
    useState,
} from 'react';
import { ArtworksRepo } from '../../core/services/art-repo/art.repo';
import { artworksReducer } from '../../reducers/artworks/artworks.reducer';
import * as ac from '../../reducers/artworks/artworks.action.creator';
import { consoleDebug } from '../../tools/debug';
import { ArtworksClass } from '../../features/models/artwork.model';
import { storage } from '../../config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { detailedArtworkReducer } from '../../reducers/artworks/detailed.reducer';

export type useArtworksType = {
    artworkDetailed: ArtworksClass | object;
    handleDetailed: (artwork: ArtworksClass) => void;
    reShuffleArtworks: (list: Array<ArtworksClass>) => void;
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
    const initialDetailed: ArtworksClass | object = {};
    const initialState: Array<ArtworksClass> = [];
    const initialStatus = 'Starting' as Status;
    const [artworks, artworksDispatcher] = useReducer(artworksReducer, initialState);
    const [artworkDetailed, detailDispatcher] = useReducer(
        detailedArtworkReducer,
        initialDetailed
    );
    const [status, setStatus] = useState(initialStatus);
    const getArtworks = () => artworks;
    const getStatus = () => status;
    const handleFile = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const element = ev.target as HTMLInputElement;
        if (!element.files) {
            alert('Any file selected');
            return;
        }
        const input = element.files[0];
        const artworkRef = ref(storage, input.name);
        await uploadBytes(artworkRef, input);
        const url = await getDownloadURL(artworkRef);
        const artworkData = new ArtworksClass(input.name, url);
        handleAdd(artworkData);
    };

    const reShuffleArtworks = (list: Array<ArtworksClass>) => {
        artworksDispatcher(ac.artworksReShuffleCreator(list));
    };

    const handleDetailed = (artwork: ArtworksClass) => {
        detailDispatcher(ac.artworksDetailedCreator(artwork))
    }

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            artworksDispatcher(ac.artworksLoadCreator(data));
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAdd = async function (artworks: ArtworksClass) {
        try {
            const fullArtworks = await repo.create(artworks);
            artworksDispatcher(ac.artworksAddCreator(fullArtworks));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (
        artworksPayload: Partial<ArtworksClass>
    ) {
        try {
            const fullArtworks = await repo.update(artworksPayload);
            artworksDispatcher(ac.artworksUpdateCreator(fullArtworks));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (id: ArtworksClass['id']) {
        try {
            const finalId = await repo.delete(id);
            artworksDispatcher(ac.artworksDeleteCreator(finalId));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        artworkDetailed,
        handleDetailed,
        reShuffleArtworks,
        handleFile,
        getStatus,
        getArtworks,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
}
