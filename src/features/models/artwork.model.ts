import { Artworks } from '../../core/types/artwork';
export class Artwork implements Artworks {
    id: string;
    description: string;
    linkTag: string;
    link: string;
    constructor(public title: string, public url: string) {
        this.id = '';
        this.description = '';
        this.linkTag = '';
        this.link = '';
    }
}
