const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // 1) get authorization data from header
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.send("unauthorized");

  // 2) get token from the authHeader  (this token is placed by frontend so that we can identoify who the user is)
  const token = authHeader.split(" ")[1];

  //3) verify token against your accesstoken
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.send(err); //invalid token status code 403
    req.username = decode.username;
    next();
  });
  // 4) now add this middleware to the routes you want to check the users
};

module.exports = verifyJWT;
