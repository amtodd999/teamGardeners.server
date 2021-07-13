const { Router } = require("express");
const Express = require("express");
const router = Express.Router();

const {NotesModel} = require("../models");

router.get(`/practice`, (req, res) => {
    res.send('Hey this is practice')
});

router.post("/create", (async (req, res) => {
    const { plant_name, note, owner_id } = req.body.note;//owner_id will need to removed
    //const { id } = req.user;
    const noteEntry = {
        plant_name,
        note,
        owner_id
    }
    try {
        const newNote = await NotesModel.create(noteEntry);
        res.status(200).json(newNote);
    } catch(err) {
        res.status(500).json({error: err});
    }
}))

//Update a Note
router.put("/update/:idToUpdate", async (req, res) => {
    const {plant_name, note, owner_id} = req.body.note;
    const noteId = req.params.idToUpdate;
    //const userId = req.user.id;

    const query = {
        where: {
            id: noteId 
            //,owner: userId
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
router.delete("/delete/:idToDelete", async (req, res) => {
    //const ownerId = req.user.id //this will need to be added later
    const noteId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: noteId
                //,owner: ownerId
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