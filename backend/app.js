const express = require("express");
const path = require('node:path');
const app = express();
const PORT = 3000;
const wardrobeRouter = require("./routers/wardrobeRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/wardrobe", wardrobeRouter);

//error
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.statusCode || 500).send(err.message);
})

app.listen(PORT, () => {
    console.log(`Wardrobe-Log - listening on port ${PORT}!`);
});
