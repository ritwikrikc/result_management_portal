
const { json } = require("express");
const express = require("express");
const { model } = require("../db-connection");

// import student login validation
const { studentLoginValidation } = require("../validation");

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


// update specific student result
router.patch("/:roll_no/update", async (req, res) => {

    try { 
        const student = await STUDENTS.updateOne(
            { roll_no: req.params.roll_no },
            {
                $set: {
                    name: req.body.name,
                    total_marks: req.body.total_marks,
                    marks: req.body.marks,
                    result_status: req.body.result_status,
                }
            }
        );
        return res.status(200).send(JSON.stringify(student));
    } catch (err) {
        return res.status(404).send(JSON.stringify({
            "error message": `${err}`
        }));
    }
    

});


// delete student
router.delete("/:roll_no/delete", async (req, res) => {
    try {
        const student = await STUDENTS.findOne({ roll_no: req.params.roll_no });
        const student_delete = await STUDENTS.deleteOne({ roll_no: req.params.roll_no });
        console.log(`------------------ student deleted: ${student} ------------------`);
        return res.status(200).send(JSON.stringify(student_delete));
    } catch (err) {
        return res.status(404).send(JSON.stringify({
            "error message": `${err}`
        }));
    }
});

//  student login
router.post("/login", async (req, res) => {
    // VALIDATE REQUEST DATA
    const { error } = studentLoginValidation(req.body);
    
    if (error)
      return res.status(400).send(JSON.stringify(error.details[0].message));
  
    // checking Roll no existence
    const student = await STUDENTS.findOne({ roll_no: req.body.roll_no });
    if (!student) {
      return res
        .status(400)
        .send(JSON.stringify({ message: "Student not exists !" }));
    }
  
    // CHECK VALID PASSWORD
    const validStudent = student.email === req.body.email;
    if (!validStudent)
      return res
        .status(403)
        .send(JSON.stringify({ message: "Invalid email id !" }));
  
    const studentResult = {
        "roll_no": student.roll_no,
        "name": student.name,
        "marks": student.marks,
        "total_marks": student.total_marks,
        "status": student.result_status
    };

    return res.status(200).send(JSON.stringify(studentResult));
  });
  


module.exports = router;