import { useContext } from 'react';
import { ArtistContact } from '../../../core/components/artist.contact/artist.contact';
import { ClientContact } from '../../../core/components/client.contact/client.contact';
import { ArtworkContext } from '../../../core/context/artworks.context';

export default function Contact() {
    const { getAdmin } = useContext(ArtworkContext);
    return (
        <>
            <section className="contact" role="article">
                {getAdmin() ? (
                    <ClientContact></ClientContact>
                ) : (
                    <ArtistContact></ArtistContact>
                )}
            </section>
        </>
    );
}
