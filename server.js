const express = require('express')
const app = express()
const port = 8080

app.listen(port, ()=>{
    console.log("Running on PORT", port);
});

app.get('/ping', (req, res) =>{
    res.send("Pong");
});