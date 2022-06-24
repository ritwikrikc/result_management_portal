require("dotenv/config");

const mongoose = require("mongoose");
const uri = process.env.DB_CONNECTION_URI;

mongoose.connect(uri, (err) => {
    if (!err)
        console.log("MongoDb connection succeeded !");
    else
        console.log(`Error in db connection: ${err}`);
});

module.exports = mongoose;