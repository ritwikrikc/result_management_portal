// get env vars

// express
const express = require("express");

// db connection
const { mongoose } = require("./db-connection");


// body parser

// express app
const app = express();


// middleware




// routes
app.get("/", (req, res) => {
    res.json(
        {
            "message": "we are on home page!"
        }
    );
});

// server listen on port
const port = 8000;
app.listen(port, () => {
    console.log(`server running on port no ${port}`);
});