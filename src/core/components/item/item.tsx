import { useContext, useEffect } from 'react';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import './item.scss';

export function Item({ item }: { item: ArtworksClass }) {
    const { getAdmin, handleFile, handleLoad } = useContext(ArtworkContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <li className="item">
                <img
                    src={item.url}
                    alt={item.title}
                    className="item__artwork"
                />
                <input type="file" name="" id="getFile" onChange={handleFile} />
                {getAdmin() ? (
                    <div>
                        <button>
                            <img
                                className="item__delete"
                                src={require('../../../assets/Trash.png')}
                                alt="delete"
                            />
                        </button>
                        <button>
                            <img
                                className="item__replace"
                                src={require('../../../assets/Replace.png')}
                                alt="replace"
                            />
                        </button>
                    </div>
                ) : (
                    ''
                )}
            </li>
        </>
    );
}
