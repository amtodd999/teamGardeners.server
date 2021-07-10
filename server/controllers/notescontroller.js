const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
const { NotesModel } = require("../models/notes");
// const validateJWT = require("../middleware/validate-jwt");

// Amelia create/add note
router.post("/add", async (req, res) => {
    const { plant_name, note, owner_id } = req.body.note; // removed owner id when using JTW
    // const { id } = req.user; // add back when adding JWT
    const plantNote = {
        plant_name,
        note,
        owner_id
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

module.exports = router;
