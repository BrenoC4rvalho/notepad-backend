import JWT  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

class TokenService {
    
    create(id: number, nickname: string) {
        return JWT.sign(
            { id, nickname},
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '2h'}
        )
    }

    decoded(token: string) {
           return JWT.verify(token, process.env.JWT_SECRET_KEY as string );
    }

    compareId(userId: number, tokenUserId: number) {
        if(userId == tokenUserId) {
            return true;
        } else {
            return false;
        }
    }

    compareNick(userNickname: string, tokenUserNickname: string) {
        if(userNickname == tokenUserNickname) {
            return true;
        } else {
            return false;
        }
    }

}

export default new TokenService;