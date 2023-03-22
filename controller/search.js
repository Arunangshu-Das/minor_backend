const Medicine = require("../model/allMedicine");

exports.search = async (req, res) => {
  try {
    const { name } = req.body;
    const med = await Medicine.find({
      Name: { $regex: name, $options: "i" },
    });
    res.status(200).send({
      success: true,
      data: med,
    });
  } catch (error) {
    console.log(error);
  }
};
