const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneno: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
  cart: {
    type: Array,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);