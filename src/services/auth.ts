import bcrypt from 'bcryptjs';
import { UserInstance } from '../models/User';

class auth {

    async createPasswordHash(password: string) {
        return await bcrypt.hash(password, 8);
    }

    async checkPassword(user: UserInstance, password: string) {
        return await bcrypt.compare(password, user.password);
    }

}

export default new auth;