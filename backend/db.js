const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://gofood:2Pd$2Ob&@cluster0.nls1xgm.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("connected");
      const fetched_data = mongoose.connection.db.collection("food_items");

      fetched_data.find({}).toArray(function (err, data) {
        const foodCategory = mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
            // console.log(global.foodCategory);
          }
        });
      });
    }
  });
};

module.exports = mongoDB;
