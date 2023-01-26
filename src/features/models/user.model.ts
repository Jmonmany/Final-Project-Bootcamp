import { UserType } from '../../core/types/users';

export class UsersClass implements UserType {
    message: object;
    constructor(
        public name: string,
        public email: string,
        public token: string,
        public uid: string
    ) {
        this.message = {
            phone: '',
            address: '',
            subject: '',
            description: '',
        };
    }
}
