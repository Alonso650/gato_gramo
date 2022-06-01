const express = require("express");
const db = require("./models");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
// Routers
const gramRouter = require("./routes/Grams");
const commentRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");
const likesRouter = require("./routes/Likes");
app.use("/auth", usersRouter);
app.use("/grams", gramRouter);
app.use("/comments", commentRouter);
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server started");
    }); 
});

// db.sequelize.sync({force: true}).then(() => {
//     app.listen(3001, () => {
//         console.log("Drop and Resync DB");
//     });
// });


