const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
const { NotesModel } = require("../models");

router.get(`/practice`, (req, res) => {
    res.send('Hey this is practice')
});

module.exports = router;
