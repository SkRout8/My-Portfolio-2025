const mongoose = require("mongoose");
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;
const dbconnect = async () => {
  await mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log(`Connected Database Successfully`);
    })
    .catch(() => {
      console.log("Error aggyaaa");
    });
};


module.exports=dbconnect