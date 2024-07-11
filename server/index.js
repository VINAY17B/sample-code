const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
require("dotenv").config();

// import routes
const authroutes = require("./routes/auth");
// const userroutes = require("./routes/user");
const emproutes = require("./routes/employer");
const studentroutes = require("./routes/employee");
const adminroutes = require("./routes/admin");
const companyroutes = require("./routes/company");
const homeroutes = require("./routes/home");
const sequelize = require("./config/db");


const app = express();

const port = process.env.PORT;

// router.use(express.static(__dirname + "./public/"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors()); //allows all origs the access
// middleware
app.use("/api", authroutes);
app.use("/api", emproutes);
app.use("/api", adminroutes);
app.use("/api", studentroutes);
app.use("/api", companyroutes);
app.use("/api", homeroutes);
// app.use("/api", userroutes);
// connect to databse
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to DB"))
//   .catch((err) => console.log("Connection Error", err));

//Testing connection of Databsse
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected to server!!!");
  })
  .catch((err) => {
    console.log("Error in Connecting the database");
    console.log(err);
  });

sequelize
  .sync({alter : true})
  .then(() => console.log("Database synced..."))
  .catch((err) => console.log("Error: " + err));

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Listening on port ${port}!`));
