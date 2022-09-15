const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("../backend/database");

const mealsRouter = require("./api/meals");
const resevationRouter = require("./api/reservations");

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


router.get('/', async (req, res) => {

  const row = await knex.select('*').from(`meals`)

  if (row.length === 0) {
    res.status(404).json({ message: 'No meals' })
  }
  else {
    res.json(row)
  }
})


/// api/meals	POST	Adds a new meal to the database

router.post('/meals', async (request, response) => {




  const [mealsId] = await knex("meals").insert({

    title: request.body.title || "Untitled",
    description: request.body.description || "No contents",
    location: request.body.location,
    when: request.body.when,
    max_reservations: request.body.max_reservations,
    price: request.body.price,
    created: request.body.created
  })
  if (mealsId === 0) {
    res.status(404).json({ message: 'No meals' })
  } else {
    response.status(201).json({ message: "Created meals", id: mealsId })
  }
})

// /api/meals/:id	GET	Returns the meal by id

router.get("/meals/:id", async (request, response) => {


  let mealQuery = await knex.select('*').from(`meals`).where({ "meals.id": request.params.id }).limit(1)


  if (mealQuery.length > 0) {
    response.json(mealQuery)
  } else {
    response.status(404).json({ error: "Not found" })
  }
})
// /api/meals/:id	PUT	Updates the meal by id
router.put('/meals/:id', async (request, response) => {

  const updatedmeal = await knex('meals').where({ "id": request.params.id }).update({

    title: request.body.title,
    description: request.body.description,
    location: request.body.location,
    when: request.body.when,
    max_reservations: request.body.max_reservations,
    price: request.body.price,
    created: request.body.created
  })
  if (updatedmeal === 0 || updatedmeal === 'undefined') {
    response.status(404).json({ error: "unable to update" })
  } else {
    response.status(201).json({ id: request.params.id, message: "meal updated", })
  }
});

//   /api/meals/:id	DELETE	Deletes the meal by id
router.delete('/meals/:id', async (request, response) => {


  mealToDelete = await knex('meals').where({ "id": request.params.id }).del();
  if (mealToDelete === 0 || mealToDelete === 'undefined') {
    response.status(404).json({ error: "unable to delete" })
  } else {
    response.status(201).json({ id: request.params.id, message: "meal deleted" })
  }

});

///////////////////////////////////////////////////////////////////////////////////
//   Reservations

router.use("/reservations", resevationRouter);

// /api/reservations	GET	Returns all reservations

router.get('/', async (req, res) => {

  const row = await knex.select('*').from(`Resevation`)
  if (row.length === 0) {
    res.status(404).json({ message: 'No Resevation' })



//   /api/reservations	POST	Adds a new reservation to the database

router.post('/resevations', async (request, response) => {

  const [reservationsId] = await knex("Resevation").insert({

    number_of_guests: request.body.number_of_guests || "Untitled",
    meal_id: request.body.description || "No contents",
    created_date: request.body.created_date,
    contact_phonenumber: request.body.contact_phonenumber,
    contact_name: request.body.contact_name,
    contact_email: request.body.contact_email
  })
  if (reservationsId === 0) {
    res.status(404).json({ message: 'No reservations' })
  } else {
    response.status(201).json({ message: "Created reservation", id: reservationsId })
  }
})

// /api/reservations/:id	GET	Returns the reservation by id

router.get("/reservations/:id", async (request, response) => {


  let reservationsQuery = await knex.select('*').from(`Reservation`).where({ "Reservation.id": request.params.id }).limit(1)


  if (reservationsQuery.length > 0) {
    response.json(reservationsQuery)
  } else {
    response.status(404).json({ error: "Reservation Not found" })
  }
})

//  /api/reservations/:id	PUT	Updates the reservation by id

router.put('/reservations/:id', async (request, response) => {

  const updatedReservation = await knex('Reservation').where({ "id": request.params.id }).update({

    number_of_guests: request.body.number_of_guests || "Untitled",
    meal_id: request.body.description,
    created_date: request.body.created_date,
    contact_phonenumber: request.body.contact_phonenumber,
    contact_name: request.body.contact_name,
    contact_email: request.body.contact_email
  })
  if (updatedReservation === 0 || updatedReservation === 'undefined') {
    response.status(404).json({ error: "unable to update reservation" })
  } else {
    response.status(201).json({ id: request.params.id, message: "Reservation updated", })
  }
});

//   /api/reservations/:id	DELETE	Deletes the reservation by id

router.delete('/reservations/:id', async (request, response) => {

  reservationToDelete = await knex('meals').where({ "id": request.params.id }).del();
  if (reservationToDelete === 0 || reservationToDelete === 'undefined') {
    response.status(404).json({ error: "unable to delete" })
  } else {
    response.status(201).json({ id: request.params.id, message: "Reservation deleted" })
  }

});


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


