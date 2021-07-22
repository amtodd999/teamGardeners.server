// const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
const { NotesModel } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

//Note create
router.post("/add", (async (req, res) => {
    const { plant_name, note } = req.body.notes;
    const  { id }  = req.user;
    const noteEntry = {
        plant_name,
        note,
        owner_id: id
    }
    try {
        const newNote = await NotesModel.create(noteEntry);
        res.status(200).json(newNote);
    } catch(err) {
        res.status(500).json({error: err});
    }
}))

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
    const {plant_name, note} = req.body.notes;
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
        note: note
    };

    try {
        const update = await NotesModel.update(updatedNote, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

//Delete a note
router.delete("/delete/:idToDelete", async (req, res) => {
    //const ownerId = req.user.id //this will need to be added later
    const noteId = req.params.idToDelete;

    try {
        const query = {
            where: {
                owner_id: noteId
                //,owner: ownerId
            }
        };

        await NotesModel.destroy(query);
        res.status(200).json({message: "Your note has been deleted"});
    } catch(err) {
        res.status(500).json({error: err});
    }
})

module.exports = router;

