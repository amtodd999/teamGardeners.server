require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
// const app=express().use('*', cors());

app.use(require('./middleware/headers'));

const controllers = require("./controllers");

app.use(express.json());

app.use("/user", controllers.userController);
app.use(require("./middleware/validate-jwt"));
app.use("/notes", controllers.notesController);
app.use("/photo", controllers.photoController);

db.authenticate()
  .then(() => db.sync()) // => {force: true} this means delete databases
  .then(() => {
    app.listen(3000, () =>
      console.log(`[Server: ] App is listening on Port ${3000}`)
    );
  })
  .catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
  });
