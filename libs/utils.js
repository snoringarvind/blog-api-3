const jwt = require("jsonwebtoken");
require("dotenv/config");

exports.issueJWT = (user) => {
  const options = {
    expiresIn: "1d",
    algorithm: "HS256",
  };

  const payload = {
    name: user.username,
    sub: user.id,
    admin: user.admin,
    iat: Date.now(),
  };
  console.log("user", user);

  const token = jwt.sign(payload, process.env.SECRET, options);
  return { token, iat: payload.iat, expiresIn: options.expiresIn };
};

exports.verifyJWT = (req, res, next) => {
  try {
    console.log("headers", req.headers.authorization);
    const bearerToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(bearerToken, process.env.SECRET);
    // console.log(decoded);
    res.locals.user = decoded;
    return next();
  } catch (err) {
    res.locals.isAuthenticated = false;
    return res.status(403).json({ msg: "you don't have access to this route" });
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (res.locals.user.admin) {
    res.locals.isAuthenticated = true;
    return next();
  } else {
    return res.status(403).json({ msg: "you don't have access to this route" });
  }
};
