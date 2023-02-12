import { Repository } from '../../types/repo';
import { ArtworksClass } from '../../../features/models/artwork.model';
const invalidIdError = new Error('Invalid ID');
const firebaseCORS = '.json';
export class ArtworksRepo implements Repository<ArtworksClass> {
    constructor(
        private url = 'https://marina-labella-web-default-rtdb.europe-west1.firebasedatabase.app/artworks/'
    ) {}
    async load(): Promise<ArtworksClass[]> {
        const resp = await fetch(this.url + firebaseCORS);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();
        const realResult = Object.keys(result).map((key) => ({
            ...result[key],
            id: key,
        }));
        return realResult.filter((item: ArtworksClass) => item.url !== undefined);
    }
    async queryId(id: string): Promise<ArtworksClass> {
        if (!id || typeof id !== 'string')
            return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }

    async create(payload: Partial<ArtworksClass>): Promise<ArtworksClass> {
        const resp = await fetch(this.url + firebaseCORS, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async update(payload: Partial<ArtworksClass>): Promise<ArtworksClass> {
        console.log(payload);
        if (!payload.id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + payload.id + firebaseCORS, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async delete(id: ArtworksClass['id']): Promise<ArtworksClass['id']> {
        if (!id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id + firebaseCORS, {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
}
