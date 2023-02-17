export interface Repository<T> {
    load: () => Promise<T[]>;
    create: (payload: Partial<T>) => Promise<T>;
    update: (payload: Partial<T>) => Promise<T>;
    delete?: (id: string) => Promise<string>;
}
