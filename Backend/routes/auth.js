const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fetchuser = require('../middelware/fetchuser')

const JWT_SECRET = "Areebisagoodb$oy";

//ROUTE 1: Create a user using POST "api/auth/createuser ", No login required
router.post(
  "/createuser",
  [
    body(
      "name",
      "Enter a valid name, name has at least 3 character"
    ).isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body(
      "password",
      "Password has at least 5 character"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //if there are error ,return bad request
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({success, error: error.array() });
    }

    //check wether the user with this email exist already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //CREATE USER
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: User.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success ,authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 2: Authenticate a user using POST "api/auth/login ", No login required

router.post(
   "/login",
   [
     body("email", "Enter a valid email").isEmail(),
     body("password", "Password cannot be blank").exists(),
   ],

   async (req, res) => {
  let success = false;
       //if there are error ,return bad request
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
      let {email ,password} =req.body;

      try {
         const user = await User.findOne({email});
         if(!user){
         
            return res.status(400).json({success ,error: "Please try to login with correct credentials"});
         }

         const passwordCompare = await bcrypt.compare(password, user.password);
         if(!passwordCompare){
         
            return res.status(400).json({success , error: "Please try to login with correct credentials"});

         }

         const data ={
            user:{
               id: user.id
            }
         }

         const authToken = jwt.sign(data ,JWT_SECRET);
         success = true;
         res.json({success, authToken})
      } catch (error) {
         console.log(error.message);
         res.status(500).send("Internal Server Error")
      }

    
   });

   //ROUTE 3: Get loggined user deatails using: POST "api/auth/getuser ", login required
   router.post(
      "/getuser", fetchuser,
      async (req, res) => {
         try {
            
            userId = req.user.id;
            const user = await User.findById(userId).select('-password');
            console.log(user);
            res.send(user);
         }catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error")
         }
      });



module.exports = router;
