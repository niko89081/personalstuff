const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

//Register

router.post("/register", async (req, res)=>{
    try{
        //hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword 
        });
        //save user response to the mongodb
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }

});

//LOGIN
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("password is wrong");

        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;