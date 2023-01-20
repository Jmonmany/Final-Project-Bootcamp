import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { ARTWORK } from '../../features/data/artmock';
import { ArtworksClass } from '../../features/models/artwork.model';
import { initialContext, ArtworkContext } from './artworks.context';
const mockArtwork: ArtworksClass = ARTWORK;
initialContext.artworks = [mockArtwork];

describe('Given the context AppContext', () => {
    let TestComponent: () => JSX.Element;
    describe('When a Test Component is wrapper with this context', () => {
        beforeEach(() => {
            TestComponent = () => {
                const {
                    artworks,
                    handleLoad,
                    handleDelete,
                    handleAdd,
                    handleUpdate,
                } = useContext(ArtworkContext);
                handleLoad();
                handleAdd(mockArtwork);
                handleDelete(mockArtwork.id);
                handleUpdate(mockArtwork);
                return <>{artworks[0].name}</>;
            };
        });
        test('Context values should be used in the component', () => {
            render(
                <ArtworkContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </ArtworkContext.Provider>
            );
            const element = screen.getByText(initialContext.artworks[0].name);
            expect(element).toBeInTheDocument();
        });
    });
});
