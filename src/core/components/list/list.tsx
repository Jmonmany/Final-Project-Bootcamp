import { useContext, useEffect } from 'react';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import { Item } from '../item/item';
import './list.scss';
export function List() {
    const { artworks, handleLoad } = useContext(ArtworkContext);
    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

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
