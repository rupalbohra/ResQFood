const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("products", UserSchema);
