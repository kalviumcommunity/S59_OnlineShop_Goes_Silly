const express = require('express')
const mongoose = require("mongoose");
const { connectToMongoDB, checkConnection } = require('./db');
const app = express()
const port = 8080


app.get('/ping', (req, res) => {
    try {
        res.send("Pong");
    }
    catch (error) {
        console.log("Error:", error)
    }
});

app.get("/", (req, res) => {
    if (checkConnection()) {
        res.send("CONNECTION STATUS : Connected To MongoDB")
    } else {
        res.send("CONNECTION STATUS : Failed To Connect With MongoDB")
    }
});

connectToMongoDB()

app.listen(port, () => {
    console.log("Running on PORT", port);
});