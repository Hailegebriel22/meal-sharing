const express = require("express");
const router = express.Router();
const knex = require("../database");
//const knex = require("../backend/database");


router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const reservations = await knex("Reservation").select();
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});


// /api/reservations	GET	Returns all reservations

router.get('/', async (req, res) => {

  const row = await knex.select('*').from(`Resevation`)
  if (row.length === 0) {
    res.status(404).json({ message: 'No Resevation' })
  }
  else {
    res.json(row)
  }
})

//   /api/reservations	POST	Adds a new reservation to the database

router.post('/', async (request, response) => {

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

router.get("/:id", async (request, response) => {


  let reservationsQuery = await knex.select('*').from(`Reservation`).where({ "Reservation.id": request.params.id }).limit(1)


  if (reservationsQuery.length > 0) {
    response.json(reservationsQuery)
  } else {
    response.status(404).json({ error: "Reservation Not found" })
  }
})
// /api/reservations/:id	PUT	Updates the reservation by id
router.put('/:id', async (request, response) => {

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
router.delete('/:id', async (request, response) => {


  reservationToDelete = await knex('Reservation').where({ "id": request.params.id }).del();
  if (reservationToDelete === 0 || reservationToDelete === 'undefined') {
    response.status(404).json({ error: "unable to delete" })
  } else {
    response.status(201).json({ id: request.params.id, message: "Reservation deleted" })
  }

});



module.exports = router;