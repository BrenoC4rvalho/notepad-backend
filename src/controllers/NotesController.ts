import { Request, Response } from "express";
import NoteService from "../services/NoteService";
import UserService from "../services/UserService";

class NotesController {

    async index(req: Request, res: Response) {
        try {
            const { nickname } = req.params;
            const user = await UserService.findByNick(nickname);

            if(!user) {
                return res.status(404).json({ message: 'user not found'})
            }

            const user_id = user.id;
            const notes = await NoteService.getAll(user_id);

            if(!notes) {
                return res.status(404).json({ message: 'notes not found'})
            }

            return res.json(notes);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const note = await NoteService.findById(parseInt(id));

            if(!note) {
                return res.status(404).json({ message: "Note not found."});
            }

            return res.status(200).json(note)
        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { title, note, user_id } = req.body;

            if(!title || !user_id) {
                return res.json({ message: "Title or user id not filled"})
            }

            const newNote = await NoteService.create(title, note, parseInt(user_id));

            return res.status(201).json(newNote);
        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { title, note } = req.body;

        const editNote = await NoteService.findById(parseInt(id));

        if(!editNote) {
            return res.status(404).json({ message: 'note not found'})
        }

        if(title) {
            editNote.title = title
        }

        if(note) {
            editNote.note = note 
        }

        const noteEdited = await NoteService.update(editNote);

        return res.json(noteEdited);

    }

    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const note = await NoteService.findById(parseInt(id));
            
            if(!note) {
                return res.status(404).json();
            }

            await NoteService.delete(parseInt(id));

            return res.status(200).json();
        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }

}

export default new NotesController;