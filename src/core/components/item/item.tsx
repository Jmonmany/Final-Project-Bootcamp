import { SyntheticEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import './item.scss';

export function Item({
    item,
    dragStart,
    dragEnter,
    dragEnd,
}: {
    item: ArtworksClass;
    dragStart: (e: SyntheticEvent) => void;
    dragEnter: (e: SyntheticEvent) => void;
    dragEnd: (e: SyntheticEvent) => void;
}) {
    const { getAdmin, handleFile, handleLoad, handleDetailed } =
        useContext(ArtworkContext);
    const navigate = useNavigate();
    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    const handleClick = () => {
        handleDetailed({ ...item, state: true });
        navigate('/details');
    };

    return (
        <>
            <li
                className="item"
                draggable
                onDragStart={dragStart}
                onDragEnter={dragEnter}
                onDragEnd={dragEnd}
            >
                <img
                    src={item.url}
                    alt={item.title}
                    className="item__artwork"
                    onClick={handleClick}
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
