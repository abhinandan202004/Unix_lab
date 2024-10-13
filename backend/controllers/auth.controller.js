import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if(password !== confirmPassword){
      return res.status(400).json({
        error :"Passwords don't match"
      })
    }
    const user = await User.findOne({username});

    if(user){
      return res.status(400).json({
        error:"User Name Already exists"
      })
    }

    //password hashing
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic : gender === "male" ? boyProfilePic : girlProfilePic
    })
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic

    })
  } catch (error) {
    console.log("error in signup Controller", error.message)
    res.status(500).json({
      error:"Inetrnal server error "
    })
  }
};


export const logout = (req, res) => {
  res.send("user logged Out");
  console.log("SignupUser");
};

export const login = (req, res) => {
  console.log("loginUser");
};