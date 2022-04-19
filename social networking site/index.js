const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");
const path = require("path");

dotenv.config();
app.use(express.static(__dirname));
mongoose.connect(
    process.env.MONGO_URL,
    {
         useNewUrlParser : true, 
         useUnifiedTopology: true
    }, 
    ()=>{
        console.log("Connected to MongoDB");
    }
);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/home", (req,res) =>{
    res.sendFile(path.join(__dirname, "/pages/home/Home.html"));
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(8800, ()=>{
    console.log("Backend server is running!");
});