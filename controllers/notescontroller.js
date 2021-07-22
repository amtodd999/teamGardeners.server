const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
const axios = require("axios");
let validateJWT = require("../middleware/validate-jwt");

const { NotesModel } = require("../models");

//create/add note
router.post("/add", async (req, res) => {
    const { plant_name, note } = req.body.notes;
    const id = req.user.id;
    const plantNote = {
        plant_name,
        note,
        owner_id: id
    }
    try {

        const newNote = await NotesModel.create(plantNote);
        res.status(200).json(newNote);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



// Amelia GET notes by owner
router.get("/myNotes", (async (req, res) => {
    const { id } = req.user;
    try {
        const userNotes = await NotesModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userNotes);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}));

//Update a Note
router.put("/update/:idToUpdate", async (req, res) => {
    const { plant_name, note } = req.body.notes;
    const noteId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: noteId,
            owner_id: userId
        }
    };

    const updatedNote = {
        plant_name: plant_name,
        note: note,
        owner_id: userId
    };

    try {
        const update = await NotesModel.update(updatedNote, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Delete a note
router.delete("/delete/:idToDelete", async (req, res) => {
    const ownerId = req.user.id
    const noteId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: noteId,
                owner_id: ownerId
            }
        };

        await NotesModel.destroy(query);
        res.status(200).json({ message: "Your note has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;

