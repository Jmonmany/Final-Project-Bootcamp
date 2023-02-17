import { Users } from '../../core/types/users';

export class User implements Users {
    message: {
        phone?: string;
        address?: string;
        subject?: string;
        description?: string;
    };
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
