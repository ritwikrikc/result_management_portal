
const { json } = require("express");
const express = require("express");
const { model } = require("../db-connection");

// model import
const STUDENTS = require("../models/student");

const router = express.Router();

// student list route
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


// fetch sprecific result

router.get("/:roll_no/result", async (req, res) => {
    try{
        
        const student = await STUDENTS.findOne({ roll_no: req.params.roll_no });

        if ( student == null) throw new Error("Bad request! Invalid roll number !");

        return res.status(200).send(JSON.stringify(student));

    } catch (err) {
        console.log("error");
        return res.status(404).send(
            JSON.stringify({
                "error message": `${err}`
            })
        );
    }
});




module.exports = router;