require('dotenv/config');
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 3000;
const enviroment =  process.env.NODE_ENV
const path = require('path')
const graduatesRoute = require('./routes/graduates');
enviroment.toLowerCase()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

    app.use('/api/graduates/', graduatesRoute);

app.listen(PORT, () => console.log(`Server is currently listening on PORT ${PORT}`))