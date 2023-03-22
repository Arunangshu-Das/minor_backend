const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user");

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneno, address, password } = req.body;

    if (!(firstname && lastname && email && phoneno && address && password)) {
      res.status(401).send("All fields are mandetory");
    }

    const extUser =
      (await User.findOne({ email })) || (await User.findOne({ phoneno }));
    if (extUser) {
      res.status(401).send("User already found");
    }

    const encryptPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstname,
      lastname,
      email,
      phoneno,
      address,
      password: encryptPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email,
        phoneno,
      },
      "Minor",
      { expiresIn: "2h" }
    );

    user.token = token;

    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    console.log("Error !!");
  }
};
