import { useMemo } from 'react';
import { ArtworkContext } from './artworks.context';
import { useArtworks } from '../../hooks/artworks/use.artworks';

export function ArtworkContextProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const { getArtworks, handleLoad, handleAdd, handleDelete, handleUpdate, handleFile } =
        useArtworks();

    const context = useMemo(
        () => ({
            artworks: getArtworks(),
            handleFile,
            handleLoad,
            handleAdd,
            handleDelete,
            handleUpdate,
        }),
        [getArtworks, handleAdd, handleDelete, handleLoad, handleUpdate, handleFile]
    );

    return (
        <ArtworkContext.Provider value={context}>
            {children}
        </ArtworkContext.Provider>
    );
}
