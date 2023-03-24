require("./config/database").connect()
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User=require("./model/user");
const Medicine=require('./model/allMedicine');
const Diseases = require("./model/diseases");
const cors = require("cors");
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Minor project 1)Arunangshu 2)Anik 3)Ratul 4)Kisalay");
})

app.post("/register",async(req,res)=>{
    try{
        const {firstname,lastname,email,phoneno,address,password}=req.body;

        if(!(firstname&&lastname&&email&&phoneno&&address&&password)){
            res.status(401).send("All fields are mandetory");
        }

        const extUser=await User.findOne({email})||await User.findOne({phoneno});
        if(extUser){
            res.status(401).send("User already found");
        }

        const encryptPassword=await bcrypt.hash(password,12)

        const user=await User.create({
            firstname,
            lastname,
            email,
            phoneno,
            address,
            password:encryptPassword,
        })

        const token=jwt.sign({
            id:user._id,email
        },'Minor',{expiresIn:'2h'})

        user.token=token;

        user.password=undefined;

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
          success: true,
          token,
          user,
        });

    }
    catch(error)
    {
        console.log(error)
        console.log("Error !!")
    }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(401).send("email and password is required");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, "Minor", {
        expiresIn: "2h",
      });

      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }
    else{
      res.status(401).send("email or password is incorrect");
    }
  } catch (error) {
    res.status(401).send("email or password is incorrect");
    console.log(error);
  }
});

app.get("/all", async (req, res) => {
  try {
    const med=await Medicine.find({})
    res.status(200).send({
      success: true,
      data:med
    })
  } catch (error) {
    console.log(error);
  }
});

app.post("/search",async(req,res)=>{
    try {
      const {name} = req.body;
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
})

app.put("/addtocart", async (req, res) => {
  try {
    const { cart , email } = req.body;
    const user = await User.findOne({ email });
    await User.updateOne(
      { _id:  user._id},
      { $push: { cart:cart } }
    );
    
    res.status(200).send({
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/showcart", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    ans=[]
    for (let i=0;i<user['cart'].length;i++)
    {
        ans.push(await Medicine.findById(user['cart'][i]));
    }

    res.status(200).send({
      success: true,
      ans,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/getmedicine', async (req,res)=>{
  try {
    const { name } = req.body;
    const di = await Diseases.findOne({
      Name: { $regex: name, $options: "i" },
    });

    ans = [];
    for (let i = 0; i < di["Medicine"].length; i++) {
      ans.push(await Medicine.findById(di["Medicine"][i]));
    }

    res.status(200).send({
      success: true,
      data: ans,
    });
  } catch (error) {
    console.log(error);
  }
})

app.post('/generatemedicine',async(req,res)=>{
  try {
    const {Name, Medicine}=req.body;

    const user = await Diseases.create({
      Name,
      Medicine
    });

    res.status(201).send({
      success:true,
      data:user
    })

  } catch (error) {
    console.log(error);
  }
})

app.listen(process.env.PORT,(err)=>{
    console.log(err)
})
