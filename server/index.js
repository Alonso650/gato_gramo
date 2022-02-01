const express = require("express");
const app = express();
const cors = require("cors");

 
// dotenv.config();

// Using this sends images and they can be large also
// or a limit size of 30mb
app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));

// middleware
app.use(cors());


const db = require("./models");

// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and Resync Db");
//     initial();
// });


db.sequelize.sync();
app.get("/", (req, res) => {
    res.json({message: "Testing server"});
});

require("./routes/user.routes")(app);
require("./routes/gram.routes")(app);

app.listen(8080, () =>{
    console.log("server has started on port 5000");
});