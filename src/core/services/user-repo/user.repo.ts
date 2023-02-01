import { Repository } from '../../types/repo';
import { UsersClass } from '../../../features/models/user.model';

const invalidIdError = new Error('Invalid ID');
const firebaseCORS = '.json';
export class UsersRepo implements Repository<UsersClass> {
    constructor(
        private url = 'https://marina-labella-web-default-rtdb.europe-west1.firebasedatabase.app/users/'
    ) {}
    async load(): Promise<UsersClass[]> {
        const resp = await fetch(this.url + firebaseCORS);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();
        return Object.values(result);
    }
    async queryId(id: string): Promise<UsersClass> {
        if (!id || typeof id !== 'string')
            return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async create(payload: Partial<UsersClass>): Promise<UsersClass> {
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
    async update(payload: Partial<UsersClass>): Promise<UsersClass> {
        if (!payload.uid) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + payload.uid + firebaseCORS, {
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
    async delete(id: UsersClass['uid']): Promise<UsersClass['uid']> {
        if (!id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id, {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
}
