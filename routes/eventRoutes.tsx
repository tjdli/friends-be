const eventsRouter = require("express").Router();

eventsRouter.route("/").get((req, res) => {
    EventPlan.find()
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json("Error: " + err));
})

eventsRouter.route("/add").post((req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const dateTime = req.body.dateTime;
    const image = req.body.image;
    const tags = req.body.tags;
    const description = req.body.description;
    const popularity = req.body.popularity;

    const newEventPlan = new EventPlan({
        name,
        location,
        dateTime,
        image,
        tags,
        description,
        popularity
    });

    newEventPlan
        .save()
        .then(() => res.json("Event added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

eventsRouter.route("/update/:id").post((req, res) => {
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

eventsRouter.route("/increasePopularity/:id").post((req, res) => {
    EventPlan.findById(req.params.id)
        .then(eventPlan => {
            eventPlan.popularity = Number(eventPlan.popularity) + 1;
            eventPlan.save()
                .then(() => res.json("Popularity incremented!"))
                .catch(err => res.status(400).json("Error " + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = eventsRouter;