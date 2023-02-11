const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, });

const connection = mongoose.connection;

connection.once('open', (err) => {
    if (err) {
        throw err;
    }
    console.log("Successfully connected to MongoDB database");
});

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/events', eventsRouter);

app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server is running on port ${port}`);
});