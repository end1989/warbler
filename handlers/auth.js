const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function(req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let { id, username, profileImage } = user;
        let token = jwt.sign(
            {
                id,
                username,
                profileImage
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImage,
            token
        });
        //Create User
        //Create Token (signing a token)
        //process.env.SECRET_KEY
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
        //See what kind of error
        //respond with username/email already taken
        //otherwise just send back a generic 400
    }
};
exports.signin = async function(req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password"
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email/Password"
        });
    }
};
