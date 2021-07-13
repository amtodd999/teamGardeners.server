const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");


const { NotesModel } = require("../models/notes");

// Amelia create/add note
router.post("/add", validateJWT, async (req, res) => {
    const { plant_name, note } = req.body.note; 
    const id = req.user; 
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
// router.get("/myNotes", async (req, res) => {
//     // const { id } = req.user;
//     try {
//         const userNotes = await JournalModel.findAll({
//             where: {
//                 owner_id: id
//             }
//         });
//         res.status(200).json(userNotes);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

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

module.exports = router;

