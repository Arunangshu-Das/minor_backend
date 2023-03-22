const mongoose = require("mongoose");

const allDiseasesSchema = new mongoose.Schema({
  Name: {
    type: String,
    default: null,
  },
  Medicine: {
    type: Array,
    default: null,
  },
});

module.exports = mongoose.model("diseases", allDiseasesSchema);
