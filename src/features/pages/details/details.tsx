import { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtworkContext } from '../../../core/context/artworks.context';
import { ArtworksClass } from '../../models/artwork.model';
import './details.scss';
export default function Details() {
    const { artworkDetailed, getAdmin, handleUpdate } =
        useContext(ArtworkContext);

    const navigate = useNavigate();

    const initialFormData: Partial<ArtworksClass> = {
        title: (artworkDetailed as ArtworksClass).title,
        description: (artworkDetailed as ArtworksClass).description,
        linkTag: (artworkDetailed as ArtworksClass).linkTag,
        link: (artworkDetailed as ArtworksClass).link,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleUpdate({ ...artworkDetailed, ...formData });
        navigate('/work');
    };

    return (
        <>
            {getAdmin() ? (
                <div className="details">
                    <img
                        src={(artworkDetailed as ArtworksClass).url}
                        alt={(artworkDetailed as ArtworksClass).title}
                        className="item__artwork"
                    />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title"
                                value={formData.title}
                                onInput={handleInput}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description"
                                value={formData.description}
                                onInput={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="linkTag"
                                id="linkTag"
                                placeholder="Link Tag"
                                value={formData.linkTag}
                                onInput={handleInput}
                                required
                            />
                            <input
                                type="text"
                                name="link"
                                id="link"
                                placeholder="Link"
                                value={formData.link}
                                onInput={handleInput}
                                required
                            />
                        </div>
                        <div className="div__btn">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="details">
                    <img
                        src={(artworkDetailed as ArtworksClass).url}
                        alt={(artworkDetailed as ArtworksClass).title}
                        className="item__artwork"
                    />
                    <section>
                        <h3>{(artworkDetailed as ArtworksClass).title}</h3>
                        <p>{(artworkDetailed as ArtworksClass).description}</p>
                        <label>
                            {(artworkDetailed as ArtworksClass).linkTag}
                        </label>
                        <a href={(artworkDetailed as ArtworksClass).link}>
                            {(artworkDetailed as ArtworksClass).link}
                        </a>
                    </section>
                </div>
            )}
        </>
    );
}
