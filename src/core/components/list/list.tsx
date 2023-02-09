import { set, ref } from 'firebase/database';
import { SyntheticEvent, useContext, useEffect, useRef } from 'react';
import { db } from '../../../config';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
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
    };
    const dragEnter = (e: SyntheticEvent, position: number) => {
        e.preventDefault();
        (dragOverItem.current as unknown) = position;
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
                </div>
            </section>
        </>
    );
}
