const express = require("express");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const Teacher = require("../models/teacher");
const { registerValidation, loginValidation } = require("../validation");

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


// REGISTER TEACHER INTO DB
router.post("/register", async (req, res) => {
    // validate data
  
    // console.log(req.body);
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).send(JSON.stringify(error.details[0].message));
  
    // checking email existence
    const emailExist = await Teacher.findOne({ email: req.body.email });
    if (emailExist) {
      return res
        .status(401)
        .send(JSON.stringify({ message: "Email already exists !" }));
    }
    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
  
    console.log("Password hasing done...")
  
    const teacher = new Teacher({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      role: req.body.role,
    });
  
    console.log("teacher instantiated...")
  
    // save teacher into db
    try {
      const savedTeacher = await teacher.save();
      console.log(`Teacher: ${savedTeacher}`);
      console.log("Teacher saved.");
      return res.status(200).send(JSON.stringify({ Teacher: savedTeacher }));
    } catch (err) {
      return res.status(400).send(JSON.stringify({ message: err }));
    }
  });  

// LOGIN TEACHER
router.post("/login", async (req, res) => {
    // VALIDATE REQUEST DATA
    const { error } = loginValidation(req.body);
  
    // console.log(`Request Body: ${JSON.stringify(req.body)}`);
    // console.log(`Request Body-headers -teacher-route: ${JSON.stringify(req.headers)}`);
  
    if (error)
      return res.status(403).send(JSON.stringify(error.details[0].message));
  
    // checking email existence
    const teacher = await Teacher.findOne({ email: req.body.email });
    if (!teacher) {
      return res
        .status(403)
        .send(JSON.stringify({ message: "Email Id not exists !" }));
    }
  
    // CHECK VALID PASSWORD
    const validPassword = await bcrypt.compare(
      req.body.password,
      teacher.password
    );

    if (!validPassword)
      return res
        .status(403)
        .send(JSON.stringify({ message: "Invalid password !" }));
  
    // CREATING A TOKEN FOR THE LOGIN USER
    const token = JWT.sign({ _id: teacher._id }, process.env.SECRET_KEY);
    return res.status(200).header("auth-token", token).send({token});
  });
module.exports = router;

