const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use("/notes", controllers.notescontrollers);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listening(3000, () => {
            console.log(`[Server]: App is listening on 3000.`)
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    })

app.listen(3000, () => {
    console.log(`[Server]: App is listening on 3000, Yay!`);
});