export type ArtworkType = {
    title: string;
    description: string;
    url: string;
    link?: string;
};

export type ArtworCollection = {
    [key: string]: ArtworkType;
};

