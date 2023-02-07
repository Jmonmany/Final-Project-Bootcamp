import { useMemo } from 'react';
import { ArtworkContext } from './artworks.context';
import { useArtworks } from '../../hooks/artworks/use.artworks';
import { useUsers } from '../../hooks/users/use.users';

export function ArtworkContextProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const {
        getArtworks,
        reShuffleArtworks,
        handleLoad,
        handleAdd,
        handleDelete,
        handleUpdate,
        handleFile,
    } = useArtworks();
    const {
        getCurrentUser,
        handleAdmin,
        getAdmin,
        getUsers,
        handleCurrentUser,
        handleUser,
        handleLoadUsers,
        handleAddUser,
        handleUpdateUser,
        handleDeleteCard,
    } = useUsers();
    const context = useMemo(
        () => ({
            users: getUsers(),
            currentUser: getCurrentUser(),
            getAdmin,
            handleAdmin,
            handleCurrentUser,
            handleUser,
            handleLoadUsers,
            handleAddUser,
            handleUpdateUser,
            handleDeleteCard,
            artworks: getArtworks(),
            reShuffleArtworks,
            handleFile,
            handleLoad,
            handleAdd,
            handleDelete,
            handleUpdate,
        }),
        [
            getCurrentUser,
            handleAdmin,
            getUsers,
            getAdmin,
            handleCurrentUser,
            handleUser,
            handleLoadUsers,
            handleAddUser,
            handleUpdateUser,
            handleDeleteCard,
            getArtworks,
            reShuffleArtworks,
            handleAdd,
            handleDelete,
            handleLoad,
            handleUpdate,
            handleFile,
        ]
    );

    return (
        <ArtworkContext.Provider value={context}>
            {children}
        </ArtworkContext.Provider>
    );
}
