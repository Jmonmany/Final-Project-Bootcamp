/* eslint-disable array-callback-return */
// import { ArtworksClass } from '../../../features/models/artwork.model';
import { useContext, useEffect } from 'react';
import { ArtworkContext } from '../../context/artworks.context';
// import { Item } from '../item/item';
export function List() {
    const { handleLoad } = useContext(ArtworkContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <section>
                <h3>Artwork List</h3>
                <ul className="artworks-list list-unstyled">
                    {/* {artworks.map((item: ArtworksClass) => {
                    return (
                        <>
                            <Item key={item.id} item={item}></Item>
                        </>
                    );
                })} */}
                </ul>
            </section>
        </>
    );
}
