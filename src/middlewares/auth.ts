import { NextFunction, Request, Response } from 'express';
import TokenService from '../services/TokenService';

class Auth {

    async private(req: Request, res: Response, next: NextFunction) {
        let success: boolean = false;

        if(req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer') {
                try {
                    const decoded: any = TokenService.decoded(token) ;
                    const { id } = req.params;
                    const { nickname } = req.params;

                    if(await TokenService.compareId(parseInt(id), decoded.id)) {
                        success = true;
                    }

                    if(await TokenService.compareNick(nickname, decoded.nickname)) {
                        success = true;
                    }

                } catch(err) {

                }
            }

        }

        if(success) {
            next();
        } else {
            res.status(403).json({ error: 'Not authorization'})
        }
    }

}

export default new Auth

