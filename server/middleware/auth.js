const jwt = require("jsonwebtoken");
const { createError } = require("../error");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(createError(403, "User not authenticated!"));
    }

    // const isCustomAuth = token.length < 500;
    // let decodedData;

    // if (isCustomAuth) {
    //   decodedData = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    //   req.userId = decodedData?.id;
    // } else {
    //   decodedData = jwt.decode(token);
    //   req.userId = decodedData?.sub;
    // }

    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.userId = decodedData?.id;

    // console.log(req.userId);

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = auth;
