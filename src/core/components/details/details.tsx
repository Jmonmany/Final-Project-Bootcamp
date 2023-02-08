import { useContext } from 'react';
import { ArtworksClass } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import './details.scss'
export function Details({ item }: { item: ArtworksClass }) {
    const { handleDetailed } = useContext(ArtworkContext);

    const handleClose = () => {
        console.log('SIDA')
        handleDetailed({...item, state: false})
    };

    return (
        <>
            <div className="details">
                <button onClick={handleClose}>
                    <img
                        className="item__delete"
                        src={require('../../../assets/cross.png')}
                        alt="cancel"
                    />
                </button>
                <img
                    src={item.url}
                    alt={item.title}
                    className="item__artwork"
                />
                <section>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <label>{item.linkTag}</label>
                    <a href={item.link}>{item.link}</a>
                </section>
            </div>
        </>
    );
}
