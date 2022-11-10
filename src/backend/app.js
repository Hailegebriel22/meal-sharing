const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("../backend/database");
const mealsRouter = require("./api/meals");
const reviewsRouter = require("./api/reviews");
<<<<<<< HEAD



=======
>>>>>>> 5756d08e88f5401c0d8a6ee958b8c5d6219d608b

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000; 
const cors = require("cors");


// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());
//router.use("/reservations", resevationRouter);
router.use("/meals", mealsRouter);
router.use("/reviews", reviewsRouter);




if (process.env.API_PATH) {
    app.use(process.env.API_PATH, router);
} else {
    throw "API_PATH is not set. Remember to set it in your .env file"
}


// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
   res.sendFile(path.join(`${buildPath}/index.html`));
 });

module.exports = app;

