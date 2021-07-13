const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const {NotesModel} = require("../models");

router.get(`/practice`, (req, res) => {
    res.send('Hey this is practice')
});

//Note create
router.post("/create", validateJWT, (async (req, res) => {
    const { plant_name, note } = req.body.note;
    const  id  = req.user.id;
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

//Update a Note
router.put("/update/:idToUpdate", validateJWT, async (req, res) => {
    const {plant_name, note} = req.body.note;
    const noteId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: noteId,
            owner: userId
            //will need to add in validation of user later
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
router.delete("/delete/:idToDelete",validateJWT, async (req, res) => {
    const ownerId = req.user.id 
    const noteId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: noteId,
                owner: ownerId
            }
        };

        await NotesModel.destroy(query);
        res.status(200).json({message: "Your note has been deleted"});
    } catch(err) {
        res.status(500).json({error: err});
    }
})

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

module.exports = router;