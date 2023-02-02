import { useContext, useEffect } from 'react';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import { Item } from '../item/item';
import './list.scss';
export function List() {
    const { artworks, handleLoad, handleAdd } = useContext(ArtworkContext);
    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    const handleAddSpace = () => {
        const newSpace = new ArtworksClass(
            'untitled',
            'https://firebasestorage.googleapis.com/v0/b/marina-labella-web.appspot.com/o/No%20image.jpg?alt=media&token=c879166a-b9c3-49c3-8f78-1554abf2d817'
        );
        handleAdd(newSpace);
    };

    const column1 = artworks.slice(0, artworks.length / 3);
    const column2 = artworks.slice(
        artworks.length / 3,
        artworks.length - artworks.length / 3
    );
    const column3 = artworks.slice(artworks.length - artworks.length / 3);
    return (
        <>
            <section className="main">
                <h3>Artwork List</h3>
                <button onClick={handleAddSpace}>ADD ARTWORK</button>
                <div className="row">
                    <ul className="artworks-list list-unstyled">
                        {column1.map((item: ArtworksClass) => {
                            return (
                                <>
                                    <Item key={item.id} item={item}></Item>
                                </>
                            );
                        })}
                    </ul>
                    <ul className="artworks-list list-unstyled">
                        {column2.map((item: ArtworksClass) => {
                            return (
                                <>
                                    <Item key={item.id} item={item}></Item>
                                </>
                            );
                        })}
                    </ul>
                    <ul className="artworks-list list-unstyled">
                        {column3.map((item: ArtworksClass) => {
                            return (
                                <>
                                    <Item key={item.id} item={item}></Item>
                                </>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </>
    );
}
