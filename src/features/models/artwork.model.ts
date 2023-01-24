import { ArtworkType } from "../../core/types/artwork";
export class ArtworksClass implements ArtworkType {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    description: string;
    link: string;
    state: boolean;
    constructor(public title: string, public url: string) {
        this.id = ArtworksClass.generateId();
        this.description = '';
        this.link = '';
        this.state = false;
    }
}

