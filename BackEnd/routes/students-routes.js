
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

        const studentResult = {
            "roll_no": student.roll_no,
            "name": student.name,
            "marks": student.marks,
            "total_marks": student.total_marks,
            "status": student.result_status
        };

        return res.status(200).send(JSON.stringify(studentResult));

    } catch (err) {
        console.log("error");
        return res.status(404).send(
            JSON.stringify({
                "error message": `${err}`
            })
        );
    }
});


//get specific student by roll no
router.get("/:roll_no/detail", async (req, res) => {
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

// add new student
router.post("/add", async (req, res) => {
    const student = new STUDENTS({
        roll_no: Number(req.body.roll_no),
        name: req.body.name,
        email: req.body.email,
        total_marks: Number(req.body.total_marks),
        marks: Number(req.body.marks),
        result_status: req.body.result_status
    });

    try{
        const save_student = await student.save();  
        return res.status(200).send(JSON.stringify(save_student));
    } catch (err) {
        return res.status(404).send(JSON.stringify({
            "error message": `${err}`
        }));
    };

});






module.exports = router;