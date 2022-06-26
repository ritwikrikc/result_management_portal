
const { json } = require("express");
const express = require("express");
const { model } = require("../db-connection");

// model import
const STUDENTS = require("../models/student");

const router = express.Router();


router.get("/list", async (req, res) => {
    try{
        console.log("Fetching student list...");
        const studentList = await STUDENTS.find();
        console.log("Student list fetched.");

        return res.status(200).send(
            JSON.stringify(studentList)
        );
    }catch (err) {
        console.log("error");
        return res.status(404).send(
            JSON.stringify({
                "error message": `${err}`
            })
        );
    }
});


module.exports = router;