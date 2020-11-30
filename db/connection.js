const mongoose = require("mongoose");

// console.log(process.env.DB_NAME)





module.exports.connectionDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.xeryg.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Database connection successfully");
  } catch (err) {
    console.log(err);
  }
};
