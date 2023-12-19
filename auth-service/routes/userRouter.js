import express from "express";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist.email) {
    if (userExist.password == password) {
      const payload = {
        email,
        name: userExist.name,
      };
      jwt.sign(payload, "secret", (err, token) => {
        if (err) console.log(err);
        else {
          return res.json({ token });
        }
      });
    } else {
      return res.json({ message: "Password is wrong" });
    }
  } else {
    return res.json({ message: "User not found" });
  }
});

router.post("/register",async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email }).lean();
  if (userExist.email) {
    return res.json({ message: "User already exists" });
  } else {
    const newUser = new User({
      name,
      email,
      password,
    });
    newUser.save();
    return res.json(newUser);
  }
});

router.get('/allUsers',async(req,res)=>{
  const users=await User.find().lean()
  if(users.length){
    res.json(users)
  }else{
    res.json({message:"No Users"})
  }
})

export default router;
