const tRouter = require("express").Router();
let Tag = require("../models/tag");

tRouter.route("/").get((req, res) => {
    Tag.find()
        .then((tags) => res.json(tags))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = tRouter;