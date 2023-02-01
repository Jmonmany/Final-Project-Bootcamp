/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { useArtworksType } from '../../hooks/artworks/use.artworks';
import { ArtworksClass } from '../../features/models/artwork.model';
import { ArtworkType } from '../types/artwork';
import { UsersClass } from '../../features/models/user.model';
import { useUsersType } from '../../hooks/users/use.users';
import { UserType } from '../types/users';
import { UserCredential } from 'firebase/auth';

export type ArtworkContextStructure = Omit<
    useArtworksType,
    'getStatus' | 'getArtworks'
> & {
    artworks: Array<ArtworksClass>;
};

export type UserContextStructure = Omit<
    useUsersType,
    'getStatus' | 'getUsers' | 'getCurrentUser'
> & {
    users: Array<UsersClass>
    currentUser: UsersClass | object
};

export const initialContext: ArtworkContextStructure & UserContextStructure = {
    users: [],
    currentUser: {},
    handleAdmin: (uid: string) => {},
    handleAddUser: async (user: UserType) => {},
    handleLoadUsers: async () => {},
    handleUpdateUser: async (userPayload: Partial<UsersClass>) => {},
    getAdmin: () => false,
    handleCurrentUser: () => {},
    handleUser: async (userCredentials: UserCredential) => {},
    artworks: [],
    handleFile: () => {},
    handleLoad: async () => {},
    handleAdd: async (artworks: ArtworkType) => {},
    handleDelete: async (id: string) => {},
    handleUpdate: async (artworksPayload: Partial<ArtworksClass>) => {},
};

export const ArtworkContext = createContext(initialContext);
