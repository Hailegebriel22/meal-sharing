const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("../backend/database");

const mealsRouter = require("./api/meals");
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

router.use("/meals", mealsRouter);

// Respond with all meals in the future (relative to the when datetime)

app.get('/future-meals', async (req, res) => {

  const [row] = await knex.raw(' SELECT * FROM `meals`WHERE `WHEN` > now()')
  
  if (row.length === 0) {
    res.status(404).json({ message: 'No meals' })
  }
  else {
    res.json(row)
  }
})

//Respond with all meals in the past (relative to the when datetime)

app.get('/past-meals', async (req, res) => {

  const [row] = await knex.raw('SELECT * FROM `meals` WHERE `WHEN` < now() ')
  if (row.length === 0) {
    res.status(404).json({ message: 'No meals' })
  }
  else {
    res.json(row)
  }
})

// Respond with all meals sorted by ID

app.get('/all-meals', async (req, res) => {

  const [row] = await knex.raw('SELECT * FROM `meals` ORDER BY `id`')
  if (row.length === 0) {
    res.status(404).json({ message: 'No meals' })
  }
  else {
    res.json(row)
  }
})

// Respond with the first meal (meaning with the minimum id)

app.get('/first-meals', async (req, res) => {

  const [row] = await knex.raw(' SELECT * FROM `meals` ORDER BY `id` LIMIT 1 ')
  if (row.length === 0) {
    res.status(404).json({ message: 'No meals' })
  }
  else {
    res.json(row)
  }
})

// Respond with the last meal (meaning with the maximum id)

app.get('/last-meals', async (req, res) => {

  const [row] = await knex.raw(' SELECT * FROM `meals` ORDER BY `id` DESC LIMIT 1')
  if (row.length === 0) {
    res.status(404).json({ message: 'No meals' })
  }
  else {
    res.json(row)
  }
})

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

