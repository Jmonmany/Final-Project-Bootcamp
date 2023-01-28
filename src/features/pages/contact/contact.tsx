import { ArtistContact } from '../../../core/components/artist.contact/artist.contact';
import { ClientContact } from '../../../core/components/client.contact/client.contact';

export default function Contact() {
    const admin = false;

    return (
        <>
            <section className="contact" role="article">
                {admin ? (
                    <ClientContact></ClientContact>
                ) : (
                    <ArtistContact></ArtistContact>
                )}
            </section>
        </>
    );
}
