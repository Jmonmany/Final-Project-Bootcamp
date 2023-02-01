import { UsersClass } from '../../features/models/user.model';

export type UserType = {
    name: string;
    email: string;
    token: string;
    uid: string;
};

export type UserCollection = {
    [key: string]: UsersClass;
};
