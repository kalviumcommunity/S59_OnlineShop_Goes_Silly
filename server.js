const express = require('express')
const mongoose = require("mongoose");
const { connectToMongoDB, checkConnection } = require('./db');
const routes = require('./routes.js')
const app = express()
const port = 8080

app.use(express.json())
app.use('/api', routes)

connectToMongoDB()

app.listen(port, () => {
    console.log("Running on PORT", port);
});