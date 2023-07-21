const express = require('express');
const app = express();

const userRoutes = require('./route/User');
const profileRoutes = require('./route/Profile');
const paymentRoutes = require('./route/Payments');
const courseRoutes = require('./route/Course');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
database.connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
     origin:"http://localhost:3000",
     credentials:true,

    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is Up"
    })
})

app.listen(PORT, ()=>{
    console.log(`APP is Running at ${PORT}`)   
})