import { useContext, useEffect } from 'react';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';

export function Item({ item }: { item: ArtworksClass }) {
    const { handleFile, handleLoad } = useContext(ArtworkContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <li className="item">
                <img src={item.url} alt={item.title} />
                <input type="file" name="" id="getFile" onClick={handleFile} />
                {/* {user.admin? <div>
                    <button className="delete"></button>
                    <button className="replace"></button>
                </div> : ''} */}
            </li>
        </>
    );
}
