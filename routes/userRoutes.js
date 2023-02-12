const router = require("express").Router();
const mongoose = require("mongoose");
const EventPlan = require("../models/eventPlan");
let User = require("../models/user");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getByUsername").get((req, res) => {
  User.findOne({username: req.query.username})
    .then(user => {
      res.json(user)
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route("/login").get((req, res) => {
  //const { username, password } = req.query;
  User.findOne( {username: req.query.username, password: req.query.password })
    .then(user => {
      res.json(user)
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const newUser = new User({
    username,
    email,
    password,
    firstName,
    lastName,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/updateTags/:id").post(async (req, res) => {
  let ids = req.body.tags.map((tag) => {
    return tag._id;
  })
  User.findByIdAndUpdate(req.params.id, {$push: {tags: {$each: ids}}})
    .catch(err => res.status(400).json(`Error: ${err}`));
})

/*
router.route("/update/:id").post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.phoneNumber = req.body.phoneNumber;
            user.tags.push(req.body.tags.split(", "));
            user.plans.push(req.body.plans.split(","));

            user.save()
                .then(() => res.json("Updated user!"))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})*/

router.route("/updateEvents/:id").post((req, res) => {
  User.findByIdAndUpdate(req.params.id, {$push: {events: {$each: req.body.events}}})
    .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route("/update/addInterest/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.interests.push(req.body.tags.split(", "));
      user.save()
        .then(() => res.json("Added event"))
    })
})

module.exports = router;
