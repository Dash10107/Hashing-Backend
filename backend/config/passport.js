const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/User");
const secret = process.env.secretKey

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();

opts.secretOrKey = secret;

module.exports = (passport) =>{
    passport.use(
        new jwtStrategy(opts,(jwt_payload,done)=>{
            User.findById(jwt_payload.id)
            .then(user=>{
                if(user) return done(null,user);

                return done(null,false);
            })
            .catch(err=>console.log(err));
        })
    );
};