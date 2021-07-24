const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
const fetch = require("node-fetch");
const { NotesModel } = require("../models");

router.put("/update", async (req, res) => {
    const { plant_name } = req.body.notes;
    const noteId = req.params.idAddPhoto;
    const userId = req.user.id;

    // const query = { where: { id: noteId, owner_id: userId } };

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_KEY}&page=1&query=${plant_name}`);
        
        const photo = await response.json();
        console.log("PHOTO", photo)
        
        const imgUrl = { photo: photo.results[0].urls.thumb };
        
        const addPic = await NotesModel.create(imgUrl);
        res.status(200).json(addPic);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// router.put("/update/:idAddPhoto", async (req, res) => {
//     const { plant_name } = req.body.notes;
//     const noteId = req.params.idAddPhoto;
//     const userId = req.user.id;

//     const query = { where: { id: noteId, owner_id: userId } };

//     try {
//         const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_KEY}&page=1&query=${plant_name}`);
        
//         const photo = await response.json();
//         console.log("PHOTO", photo)
        
//         const imgUrl = { photo: photo.results[0].urls.thumb };
        
//         const addPic = await NotesModel.update(imgUrl, query);
//         res.status(200).json(addPic);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// })

module.exports = router

 // const photo =(
        // axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_KEY}&page=1&query=${plant_name}`)
        //     .then(response => response.json())
        //     .then(data => data.results[0].urls.thumb)
        //     .catch(err => {
        //         console.log(err)
        //         res.status(500).json(err)
        //     })
        // );