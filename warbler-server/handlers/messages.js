const db = require("../models");
// "/api/users/:id/messages/"
exports.createMessage = async function(req, res, next){
    try{
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.message.push(message._id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message._id).populate("user", {
            username:true,
            profileImageUrl: true
        }); // get the message and username and image from database at the same time
        return res.status(200).json(foundMessage);
    } catch(err){
        return next(err);
    }
};

// /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next) {
    try{
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    } catch(err) {
        return next(err);
    }
};
exports.deleteMessage = async function(req, res, next){
    try{
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch(err){
        return next(err);
    }
};