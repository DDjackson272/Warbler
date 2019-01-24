const db = require("../models");
const jwt = require("jsonwebtoken");

// signup and signin, if successfully done, will return a decoded token
exports.signin = async function(req, res, next){
    try{
        // finding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        // checking if their password matches what was sent to the server
        // if it all matches
        // log them in
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid email/password."
            })
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid email/password."
        })
    }

};

exports.signup = async function(req, res, next){
    try {
        // create a user
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
        // create a token (signing a token)
        // process.env.SECRET_KEY
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        if (err.code === 11000){ // when user provides something that is not unique
            err.message = "sorry, that username and/or email is taken";
        }
        return next({
            status: 400, // user validation failed: do not provide required information
            message: err.message
        });
    }
};