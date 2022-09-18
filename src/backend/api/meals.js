const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meal = await knex("meals").select();
    response.json(meal);
  } catch (error) {
    throw error;
  }
});

///api/meals	POST	Adds a new meal to the database

router.post('/', async (request, response) => {

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

router.get("/:id", async (request, response) => {


  let mealQuery = await knex.select('*').from(`meals`).where({ "meals.id": request.params.id }).limit(1)


  if (mealQuery.length > 0) {
    response.json(mealQuery)
  } else {
    response.status(404).json({ error: "Not found" })
  }
});

// /api/meals/:id	PUT	Updates the meal by id

router.put('/:id', async (request, response) => {

  const updatedmeal = await knex('meals').where({ "id": request.params.id }).update({

    title: request.body.title,
    description: request.body.description,
    location: request.body.location,
    when: request.body.when,
    max_reservations: request.body.max_reservations,
    price: request.body.price,
    created: request.body.created
  })

  if (updatedmeal === 0 || updatedmeal === undefined) {
    response.status(404).json({ error: "unable to update" })
  } else {
    response.status(201).json({ id: request.params.id, message: "meal updated", })
  }
});

//   /api/meals/:id	DELETE	Deletes the meal by id
router.delete('/:id', async (request, response) => {


  mealToDelete = await knex('meals').where({ "id": request.params.id }).del();
  if (mealToDelete === 0 || mealToDelete === 'undefined') {
    response.status(404).json({ error: "unable to delete" })
  } else {
    response.status(201).json({ id: request.params.id, message: "meal deleted" })
  }

});

module.exports = router;
