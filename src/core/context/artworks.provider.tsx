import { useMemo } from 'react';
import { ArtworkContext } from './artworks.context';
import { useArtworks } from '../../hooks/use.artworks';

export function ArtworkContextProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const { getArtworks, handleLoad, handleAdd, handleDelete, handleUpdate } =
        useArtworks();

    const context = useMemo(
        () => ({
            artworks: getArtworks(),
            handleLoad,
            handleAdd,
            handleDelete,
            handleUpdate,
        }),
        [getArtworks, handleAdd, handleDelete, handleLoad, handleUpdate]
    );

    return (
        <ArtworkContext.Provider value={context}>
            {children}
        </ArtworkContext.Provider>
    );
}
