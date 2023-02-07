import { set, ref } from 'firebase/database';
import { SyntheticEvent, useContext, useEffect, useRef } from 'react';
import { db } from '../../../config';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import { ArtworCollection } from '../../types/artwork';
import { Item } from '../item/item';
import './list.scss';
export function List() {
    const { artworks, handleLoad, handleAdd, reShuffleArtworks } =
        useContext(ArtworkContext);
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

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (e: SyntheticEvent, position: number) => {
        (dragItem.current as unknown) = position;
        console.log('ON DRAG START');
    };
    const dragEnter = (e: SyntheticEvent, position: number) => {
        e.preventDefault();
        (dragOverItem.current as unknown) = position;
        console.log('ON DRAG OVER');
    };

    const drop = (e: SyntheticEvent) => {
        const copyListItems = [...artworks];
        const dragItemContent =
            copyListItems[dragItem.current as unknown as number];
        copyListItems.splice(dragItem.current as unknown as number, 1);
        copyListItems.splice(
            dragOverItem.current as unknown as number,
            0,
            dragItemContent
        );
        (dragItem.current as unknown as null) = null;
        (dragOverItem.current as unknown as null) = null;
        // first atempt to preserv firebase key
        // const artworkCollection = copyListItems.map((artwork) => {
        //     return { [artwork.id]: { ...artwork } };
        // });
        // set(ref(db, 'artworks/'), Object.assign({}, ...artworkCollection));
        set(ref(db, 'artworks/'), copyListItems);
        reShuffleArtworks(copyListItems);
    };

    // code for 3 columns after drag&drop
    // const column1 = artworks.slice(0, artworks.length / 3);
    // const column2 = artworks.slice(
    //     artworks.length / 3,
    //     artworks.length - artworks.length / 3
    // );
    // const column3 = artworks.slice(artworks.length - artworks.length / 3);
    return (
        <>
            <section className="main">
                <h3>Artwork List</h3>
                <button onClick={handleAddSpace}>ADD ARTWORK</button>
                <div className="row">
                    <ul className="artworks-list list-unstyled">
                        {artworks.map((item: ArtworksClass, index) => {
                            return (
                                <Item
                                    key={index}
                                    item={item}
                                    dragStart={(e: SyntheticEvent) =>
                                        dragStart(e, index)
                                    }
                                    dragEnter={(e: SyntheticEvent) =>
                                        dragEnter(e, index)
                                    }
                                    dragEnd={drop}
                                ></Item>
                            );
                        })}
                    </ul>

                    {/* code for 3 columns after drag&drop */}
                    {/* <ul className="artworks-list list-unstyled">
                        {column1.map((item: ArtworksClass) => {
                            return <Item key={item.id} item={item}></Item>;
                        })}
                    </ul>
                    <ul className="artworks-list list-unstyled">
                        {column2.map((item: ArtworksClass) => {
                            return <Item key={item.id} item={item}></Item>;
                        })}
                    </ul>
                    <ul className="artworks-list list-unstyled">
                        {column3.map((item: ArtworksClass) => {
                            return <Item key={item.id} item={item}></Item>;
                        })}
                    </ul> */}
                </div>
            </section>
        </>
    );
}
