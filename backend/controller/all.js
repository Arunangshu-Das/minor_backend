const Medicine = require("../model/allMedicine");
exports.all = async (req, res) => {
  try {
    const med = await Medicine.find({});
    res.status(200).send({
      success: true,
      data: med,
    });
  } catch (error) {
    console.log(error);
  }
};
