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
mongoose.set('strictQuery', false);
const connection = mongoose.connection;

connection.once('open', (err) => {
    if (err) {
        throw err;
    }
    console.log("Successfully connected to MongoDB database");
});

const usersRouter = require('./routes/userRoutes');
const eventsRouter = require('./routes/eventRoutes');
const tagsRouter = require('./routes/tagRoutes');

app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/tags', tagsRouter);

app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server is running on port ${port}`);
});