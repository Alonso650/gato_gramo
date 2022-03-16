const express = require("express");
const db = require("./models");
const flash = require("express-flash");

const app = express();


// cross-origin-resource sharing: http header-based system
// allowing a server to specify any other origins (domain, scheme, or port)
// from where a browser should enable resources to be loaded other
// than its own
const cors = require("cors");


// Using this sends images and they can be large also
// or a limit size of 30mb
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
//app.use(express.json({ extended: true}));

app.use(flash());


app.use(cors());


// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and Resync Db");
// });


db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({message: "Testing server"});
});

require("./routes/user.routes")(app);
require("./routes/gram.routes")(app);



app.listen(8080, () =>{
    console.log("server has started on port 8080");
});