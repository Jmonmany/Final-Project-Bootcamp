import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { loginWithGoogle } from '../../config';
import { ARTWORK, ARTWORK2 } from '../../features/data/artmock';
import { USER, USER2 } from '../../features/data/usermock';
import { ArtworksClass } from '../../features/models/artwork.model';
import { UsersClass } from '../../features/models/user.model';
import { initialContext, ArtworkContext } from './artworks.context';
jest.mock('@firebase/database');
jest.mock('../../config');
const mockArtwork: ArtworksClass = ARTWORK;
const mockUser: UsersClass = USER;
const mockDetailedArtwork: ArtworksClass = ARTWORK2;
const mockCurrentUser: UsersClass = USER2;
initialContext.artworks = [mockArtwork];
initialContext.users = [mockUser];
initialContext.artworkDetailed = mockDetailedArtwork;
initialContext.currentUser = mockCurrentUser;

describe('Given the context AppContext', () => {
    let TestComponent: () => JSX.Element;
    describe('When a Test Component is wrapper with this context', () => {
        beforeEach(async () => {
            (loginWithGoogle as jest.Mock).mockResolvedValue({
                name: 'sample',
                email: 'sample@gmail.com',
                getIdToken: '12345',
                user: {
                    displayName: '',
                    email: '',
                    getIdToken: jest.fn(),
                    uid: '',
                },
            });
            const userCredentialsMock = await loginWithGoogle();
            TestComponent = () => {
                const {
                    users,
                    currentUser,
                    getAdmin,
                    handleAdmin,
                    handleCurrentUser,
                    handleUser,
                    handleLoadUsers,
                    handleAddUser,
                    handleUpdateUser,
                    handleDeleteCard,
                    artworks,
                    artworkDetailed,
                    handleDetailed,
                    reShuffleArtworks,
                    // handleFile,
                    handleLoad,
                    handleAdd,
                    handleDelete,
                    handleUpdate,
                } = useContext(ArtworkContext);
                getAdmin();
                handleAdmin(mockUser.uid);
                handleCurrentUser(mockUser);
                handleUser(userCredentialsMock);
                handleLoadUsers();
                handleAddUser(mockUser);
                handleUpdateUser(mockUser);
                handleDeleteCard(mockUser.uid);
                handleDetailed(mockArtwork);
                reShuffleArtworks([mockArtwork]);
                // handleFile();
                handleLoad();
                handleAdd(mockArtwork);
                handleDelete(mockArtwork.id);
                handleUpdate(mockArtwork);
                return (
                    <>
                        <ul>
                            <li>{artworks[0].title}</li>
                            <li>{users[0].name}</li>
                            <li>{(currentUser as UsersClass).name}</li>
                            <li>{(artworkDetailed as ArtworksClass).title}</li>
                        </ul>
                    </>
                );
            };
        });
        test('Context values should be used in the component', () => {
            render(
                <ArtworkContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </ArtworkContext.Provider>
            );
            const elementArt = screen.getByText(
                initialContext.artworks[0].title
            );
            const elementUser = screen.getByText(initialContext.users[0].name);
            const elementDetailedArt = screen.getByText(
                (initialContext.artworkDetailed as ArtworksClass).title
            );
            const elementCurrentUser = screen.getByText(
                (initialContext.currentUser as UsersClass).name
            );
            expect(elementArt).toBeInTheDocument();
            expect(elementUser).toBeInTheDocument();
            expect(elementDetailedArt).toBeInTheDocument();
            expect(elementCurrentUser).toBeInTheDocument();
        });
    });
});
