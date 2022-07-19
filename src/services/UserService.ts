import { User } from '../models/User'

class UserService {
    
    async findById(id: number) {
        return await User.findByPk(id, {
            attributes: { exclude: ['password']}
        })
    }

    async findByNick(nickname: string) {
        return await User.findOne({
            where: { nickname },
            attributes: { exclude: ['password']}
        })
    } 

    async findForLogin(nickname: string) {
        return await User.findOne({
            where: {nickname}
        })
    }

    async create(nickname: string, password: string) {
        return await User.create({
            nickname,
            password
        })
    }

    async delete(id: number) {
        return await User.destroy({
            where: { id }
        })        
    }
    
}

export default new UserService