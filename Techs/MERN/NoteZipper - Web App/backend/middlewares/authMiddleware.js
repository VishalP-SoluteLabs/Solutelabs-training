const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      const authHeader = req.get('Authorization');

      if (!authHeader) {
          const error = new Error('Not Authenticated..!!');
          error.statusCode = 401;
          throw error;
      }
  
      token = authHeader.split(" ")[1];
      // console.log(token)
      
      //decodes token id
      let decodedToken; //Bearer is not needed, its just convention to write it for token for json data
      try {
          decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) //It will decode and verify both
      } catch (err) {
          err.statusCode = 500;
          throw err;
      }
      if (!decodedToken) {
          const error = new Error('Not Authenticated..!');
          error.statusCode = 401;
          throw error;
      }

      req.user = await User.findById(decodedToken.id).select('-password')
      // req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
