import { User } from '../../features/models/user.model';

export type Users = {
    name: string;
    email: string;
    token: string;
    uid: string;
};

export type UserCollection = {
    [key: string]: User;
};
