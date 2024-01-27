const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("DB connection established"))
    .catch((err) => {
      console.error("DB connection error");
      console.log(err);
      process.exit(1);
    });
};
