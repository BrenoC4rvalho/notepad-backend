import { Note, NoteInstance } from "../models/Note";

class NoteServie {
    
    async getAll(user_id: number) {
        return await Note.findAll({
            where: { user_id }
        });
    }

    async findById(id: number) {
        return await Note.findByPk(id);
    }

    async create(title: string, note: string, user_id: number) {
        return await Note.create({
            title,
            note,
            user_id
        })
    }

    async update(note: NoteInstance) {
        return await note.save()
    }

    async delete(id: number) {
        return await Note.destroy({
            where: { id }
        })
    }

}

export default new NoteServie;