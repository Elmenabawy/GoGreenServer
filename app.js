const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require("mongoose");
const helmet= require("helmet");
const session = require("express-session");
const cors = require('cors');
const axios = require("axios");


const ejs= require("ejs");
const logging=require("./middlewares/logging");
const studentsRouter=require("./routes/Students");
const userRouter=require("./routes/User");
const authRouter=require("./routes/auth");
const adminRouter=require("./routes/admin");
const consumptionRouter = require('./routes/Package');




//2) set connection
mongoose.connect("mongodb+srv://ahhossam68:c2RmScIUYX0H3gsw@cluster0.ihphmxf.mongodb.net/iti",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(()=>{
    console.log("connected to Database...")
})
.catch((err)=>{
    console.log(err)
});

//built in midlleware
app.use(
    session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true,
      cookie: { secure: false }, // Set to true if using https
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", 'https://gogreenserver-1.onrender.com'],
            // Add other directives as needed based on your application's requirements
        },
    })
);

app.use(express.static("public"));// Serving static files from the public directory


//user middleware(APPLICATION-LEVEL MIDDLEWARE)
//LOGIN
app.use(logging);
app.use(cors());

app.use("/api/Students",studentsRouter);
app.use("/api/Users",userRouter);
app.use("/api/login",authRouter);
app.use("/api/admin",adminRouter);
app.use("/api/package", consumptionRouter);


//app.use(errorMW);
// Add route to serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 50000;




console.log(`Listening on port ${port}`);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
