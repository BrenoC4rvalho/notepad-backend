import { Request, Response } from "express";
import auth from "../services/auth";
import TokenService from "../services/TokenService";
import UserService from '../services/UserService';

class USersController {

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.findById(parseInt(id));

            if(!user) {
                return res.status(404).json({ message: "User not found."});
            }

            return res.status(200).json(user)
        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { nickname, password } = req.body;
            const user = await UserService.findByNick(nickname);

            console.log('register funcionando', nickname, password)
            
            if(!nickname || !password) {
                return res.json({ message: "Nickname or password not filled"})
            }

            if(user) {
                return res.status(422).json({ message: `User ${nickname} already exists.`});
            }


            const encryptedPassword = await auth.createPasswordHash(password);
            const newUser = await UserService.create(nickname, encryptedPassword);
            const token = await TokenService.create(newUser.id, newUser.nickname);

            return res.status(201).json({
                user: {
                    id: newUser.id,
                    nickname
                },
                token
            });
        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.findById(parseInt(id));
            
            if(!user) {
                return res.status(404).json();
            }

            await UserService.delete(parseInt(id));

            return res.status(200).json();
        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }

    async session(req: Request, res: Response) {
        try {
            const { nickname, password } = req.body;
            const user = await UserService.findForLogin(nickname);

            console.log('login funcionando', nickname, password)

            if(!user) {
                return res.status(401).json({ error: "User / password invalid."});
            }

            if(!await auth.checkPassword(user, password)) {
                return res.status(401).json({ error: "User / password invalid."});
            }

            const token = await TokenService.create(user.id, nickname);

            return res.json({
                user: {
                    id: user.id,
                    nickname
                }, 
                token
            })

        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }
}

export default new USersController;