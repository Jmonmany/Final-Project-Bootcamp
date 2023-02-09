import { useContext } from "react";
import { ArtworkContext } from "../../../core/context/artworks.context";
import { ArtworksClass } from "../../models/artwork.model";
import './details.scss';
export default function Details() {
    const { artworkDetailed } = useContext(ArtworkContext);
    return (
        <>
            <div className="details">
                <img
                    src={(artworkDetailed as ArtworksClass).url}
                    alt={(artworkDetailed as ArtworksClass).title}
                    className="item__artwork"
                />
                <section>
                    <h3>{(artworkDetailed as ArtworksClass).title}</h3>
                    <p>{(artworkDetailed as ArtworksClass).description}</p>
                    <label>{(artworkDetailed as ArtworksClass).linkTag}</label>
                    <a href={(artworkDetailed as ArtworksClass).link}>{(artworkDetailed as ArtworksClass).link}</a>
                </section>
            </div>
        </>
    );
}
