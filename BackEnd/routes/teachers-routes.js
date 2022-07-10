
const express = require("express");

// model import
const TEACHER = require("../models/teacher");

const router = express.Router();

// teacher list route
router.get("/list", async (req, res) => {
    try{
        const teacherList = await TEACHER.find();

        return res.status(200).send(
            JSON.stringify(teacherList)
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

