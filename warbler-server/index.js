require("dotenv").config(); // load parameters from ".env" to process.env
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");
const db = require("./models");

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

// all my routes here, these three middlewares are in parallel
app.use("/api/auth", authRoutes); // specify prefix of authRoutes
app.use("/api/users/:id/messages", loginRequired, ensureCorrectUser, messageRoutes); // specify three other middleware here
app.get("/api/messages", loginRequired, async function(req, res, next){
    try{
        let message = await db.Message.find()
            .sort({createAt:"desc"})
            .populate("user", {
                username: true,
                profileImageUrl: true
            });
        return res.status(200).json(message);
    } catch (err){
        return next(err);
    }
});

// these two middlewares handle errors, if there is a specified error, pass to errorHandler; else pass to the first
// middleware below
app.use(function(req, res, next){
   return next({
       status: 404,
       message: "NOT FOUND"
   });
});

app.use(errorHandler);


app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
});