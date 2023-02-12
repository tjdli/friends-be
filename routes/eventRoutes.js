const eRouter = require("express").Router();
let EventPlan = require("../models/eventPlan");

eRouter.route("/").get((req, res) => {
    EventPlan.find()
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json("Error: " + err));
})

eRouter.route("/findByTitleAddress").get((req, res) => {
    EventPlan.findOne({name: req.query.name, location: req.query.location})
        .then(event=>{
            console.log(event.json);
            res.json(event);
        })
        .catch(err => res.status(400).json(`Error ${err}`));
})

eRouter.route("/add").post((req, res) => {
    const name = req.body.title;
    const location = req.body.address;
    const dateTime = req.body.date;
    //const image = req.body.image;
    const tags = req.body.tags;
    const description = req.body.description;

    const newEventPlan = new EventPlan({
        name,
        location,
        dateTime,
        //image,
        tags,
        description,
    });

    newEventPlan
        .save()
        .then(() => res.json("Event added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

eRouter.route("/update/:id").post((req, res) => {
    EventPlan.findById(req.params.id)
        .then(eventPlan => {
            eventPlan.name = req.params.name;
            eventPlan.location = req.params.location;
            eventPlan.dateTime = req.params.dateTime;
            eventPlan.image = req.params.image;
            eventPlan.tags = req.params.tags;
            eventPlan.description = req.params.description;

            eventPlan.save()
                .then(() => res.json("Updated event!"))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

eRouter.route("/increasePopularity/:id").post((req, res) => {
    EventPlan.findById(req.params.id)
        .then(eventPlan => {
            eventPlan.popularity = Number(eventPlan.popularity) + 1;
            eventPlan.save()
                .then(() => res.json("Popularity incremented!"))
                .catch(err => res.status(400).json("Error " + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = eRouter;