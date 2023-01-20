export type ArtworkModel = {
    name: string;
    imageUrl: string;
};

export class ArtworksClass implements ArtworkModel {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    state: boolean;
    constructor(public name: string, public imageUrl: string) {
        this.id = ArtworksClass.generateId();
        this.state = true;
    }
}
