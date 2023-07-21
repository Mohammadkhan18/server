const mongoose = require('mongoose');
require('dotenv').config();


exports.connectDb = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Db connected sucessfully"))
    .catch((error) =>{
         console.log("Db connection Failed");
         console.error(error);
         process.exit(1);
        }) ;
}