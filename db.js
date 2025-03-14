const mongoose = require("mongoose");
require("dotenv").config();

const ONLINE_DB =  process.env.ONLINE
 const DB_LOCAL =  'mongodb://127.0.0.1:27017/napwork'


mongoose.connect(DB_LOCAL, {
  useNewUrlParser: true,
  // useUnifiedTopology: true
});


const DB = mongoose.connection;

DB.on('connected', () => {
    console.log("Connection to DB is successful");
});
DB.on("error", (err) => {
    console.log("Error in DB connection", err);
});
DB.on("disconnected", () => {
    console.log('Disconnected from DB');
});


module.exports = DB ;