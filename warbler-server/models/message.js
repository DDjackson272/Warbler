const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        required: true,
        maxLength: 160
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // match up with what we named our model
    }
}, {
    timestamps: true
});

// hook
messageSchema.pre("remove", async function(next){
    // find a user
    // remove the id of the message from their message list
    // save that user
    // return next
    try{
        let user = await User.findById(this.user._id); // this refers to messageSchema;
        // if => is used, this refers to the whole module
        user.message.remove(this._id);
        await user.save();
        return next();
    } catch (err) {
        return next(err);
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;