const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticate = require("../middleware/authenticate.js");

require("../db/conn");
const User = require("../model/userSchema");

//using promises
// router.post("/register", async (req, res) => {
//   const { name, email, phone, password, work, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "please filled the field properly" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already Exist" });
//       }
//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfuly" });
//         })
//         .catch((err) =>
//           res.status(500).json({ error: "Failed to registered" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//async await

router.post("/register", async (req, res) => {
  const { name, email, phone, password, work, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "please filled the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).json({ error: "Email already Exist" });
      return;
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "user registered successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/signin", async (req, res) => {
  //console.log(req.body);
  //res.json({ message: "awesome" });
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      //need to generate the token and stored cookie after the password match
      const token = await userLogin.generateAuthToken();
      //console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 258920000000000),
        httpOnly: true,
        secure: true,
      });
      //console.log(`req.cookies.jwtoken`);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credientials" });
      } else {
        res.json({ message: "user Signin successfuly" });
      }
    } else {
      res.status(400).json({ error: "Invalid credientials" });
    }
  } catch (error) {
    console.log(error);
  }
});

//about us ka page

router.get("/about", authenticate, (req, res) => {
  console.log("Hello world from the server about");
  if (!req.body.rootUser) {
    return res.send("server error");
  }
  res.send(req.body.rootUser);
  //console.log(req.body.rootUser);
});

/*get user data for contact us and home page  */
router.get("/getdata", authenticate, (req, res) => {
  console.log("Hello world from the server contact");
  if (!req.body.rootUser) {
    return res.send("server error");
  }
  res.send(req.body.rootUser);
  //console.log(req.body.rootUser);
});
//contact us page

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "please fill the contact form" });
    }
    const userContact = await User.findOne({ _id: req.body.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json("user contact successfully");
    }
  } catch (error) {
    console.log(error);
  }
});

//logout page

router.get("/logout", (req, res) => {
  console.log("Hello world from the server logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});
module.exports = router;
