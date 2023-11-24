const express = require("express");
const db = require("./models");
const app = express();
const cors = require("cors");

app.use(express.json({ limit: '50mb' }));

// parse incoming requests with URL-encoded payloads, allowing server to handle
// form submissions/data submitted through HTTP Post requests where data is in the
// URL-encoded format
app.use(express.urlencoded({ limit: '50mb', extended: true }))
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
    })
});

// db.sequelize.sync({force: true}).then(() => {
//     app.listen(3001, () => {
//         console.log("Drop and Resync DB");
//     });
// });


