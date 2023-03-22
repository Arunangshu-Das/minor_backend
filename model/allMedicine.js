const mongoose = require("mongoose");

const allMedicineSchema = new mongoose.Schema({
  Image: {
    type: String,
    default: null,
  },
  Desctription: {
    type: String,
    default: null,
  },
  Price: {
    type: String,
    default: 0.0,
  },
  Name: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("medicine", allMedicineSchema);
