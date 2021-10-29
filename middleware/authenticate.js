const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = await req.cookies.jwtoken;
    //console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(verifyToken);

    if (!verifyToken) {
      return res.json({ auth: false });
    }
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      return res.send("user not found");
    }

    req.body.token = token;
    req.body.rootUser = rootUser;
    req.body.userID = rootUser._id;
  } catch (error) {
    return res.status(401).send("unauthorized:No  token provided");
    console.log(error);
  }
  next();
};

module.exports = authenticate;
