const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv/config");
const User = require("../models/User");

const getCookie = (req, res) => {
  if (req.cookies) {
    return req.cookies.jwt;
  } else {
    return null;
  }
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([getCookie]),
  secretOrKey: process.env.SECRET,
  algorithms: ["HS256"],
};

module.exports = (passport) => {
  passport.use(
    new jwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.sub, (err, result) => {
        if (err) return done(err);
        if (result == null) return done(null, false);
        if (result) return done(null, true);
      });
    })
  );
};
