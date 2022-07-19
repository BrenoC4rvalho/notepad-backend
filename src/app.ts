import express, { Express, Request, Response, Errback, NextFunction } from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';

class App {
    
    server: Express;
    
    constructor() {
        this.server = express();   
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.server.use(userRoutes);
        this.server.use(noteRoutes);
        this.server.use((req: Request, res: Response) => {
            res.status(404).json({ error: 'Endpoint not found.'});
        })
        this.server.use((err: Errback, req: Request, res: Response, next: NextFunction ) => {
            res.status(400).json({ error: 'There was a problem'});
            console.log(err);
        })
    }

}

export default new App().server;