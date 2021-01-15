const jwt = require("jsonwebtoken");
require("dotenv/config");

const options = {
  expiresIn: "1d",
  algorithm: "HS256",
};

exports.issueJWT = (user) => {
  const payload = {
    name: user.username,
    sub: user.id,
    iat: Date.now(),
  };

  const token = jwt.sign(payload, process.env.SECRET, options);
  return token;
};
