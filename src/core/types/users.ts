export type UserType = {
    name: string;
    email: string;
    token: string;
    uid: string;
};

export type UserCollection = {
    [key: string]: UserType
}
