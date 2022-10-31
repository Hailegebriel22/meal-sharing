const express = require("express")
const router = express.Router();
const knex = require("../database");





//  /api/meals/:meal_id/reviews	GET	Returns all reviews for a specific meal.
//  Reviews

router.get("/:meal_id/reviews", async (request, response) => {

  let mealReviews = await knex("Review").select().where({ "Review.meal_id": request.params.meal_id })

  return response.json(mealReviews)
  //  response.status(404).json({ error: "Review Not found" })

})




router.get("/", async (request, response) => {
  let meals = knex("meals")

  // maxPrice	Number	Returns all meals that are cheaper than maxPrice.	api/meals?maxPrice=90

  if ("maxPrice" in request.query) {
    if (isNaN(request.query.maxPrice)) {

      response.status(404).json({ error: "max price is not a number" });
      return
    }
    meals = meals.where('meals.price', '<', `${request.query.maxPrice}`);


  }

  // availableReservations	Boolean	Returns all meals that still have available spots left. 
  // *	api/meals?availableReservations=true

  // SQL 
  /* SELECT meals.id,meals.title, max_reservations, (meals.max_reservations - COALESCE(SUM(Reservation.number_of_guests),0)
) AS available_reservations FROM meals 
LEFT  join Reservation ON  meals.id = Reservation.meal_id
GROUP BY meals.id
having (available_reservations > 0); */



  const meal = knex("meals")
  const query = meal.leftJoin("Reservation", "Reservation.meal_id", "meals.id")
    .select("meals.*")
    .groupBy("meals.id");
  const availableReservations = await query.havingRaw("max_reservations IS NULL OR SUM(COALESCE(Reservation.number_of_guests, 0)) < max_reservations")


  if (('availableReservations' in request.query) && (typeof request.query.availableReservations == "string")) {
    if (request.query.availableReservations == "true") {
      response.json(availableReservations);
      return

    } else {
      response.status(404).json({ error: "Not found reservation" })

    }
  }

  // title	String	Returns all meals that partially match the given title. 
  // Rød grød will match the meal with the title Rød grød med fløde.api/meals?title=Indian%20platter

  if ('title' in request.query) {
    meals = meals.where('meals.title', 'like', `%${request.query.title}%`);
  }

  // dateAfter	Date	Returns all meals where the date for when is after the given date.
  //	api/meals?dateAfter=2022-10-01



  if ('dateAfter' in request.query) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    // const dateAfterMatch = meals.where('meals.when', '>', `${request.query.dateAfter}`);

    if (request.query.dateAfter.match(regEx)) {
      meals = meals.where('meals.when', '>', `${request.query.dateAfter}`);
    } else {
      response.status(404).json({ error: "Match Not found" })
      return
    }
  };

  // dateBefore	Date	Returns all meals where the date for when is before the given date.
  //	api/meals?dateBefore=2022-08-08

  if ('dateBefore' in request.query) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    // const dateBeforeMatch = meals.where('meals.when', '<', `${request.query.dateBefore}`);

    if (request.query.dateBefore.match(regEx)) {
      meals = meals.where('meals.when', '>', `${request.query.dateBefore}`);
    } else {
      response.status(404).json({ error: "Match Not found" })
      return
    }
  };
  //  limit	Number	Returns the given number of meals.	api/meals?limit=7
  if ('limit' in request.query) {

    if (isNaN(request.query.limit)) {
      response.status(404).json({ error: "requested query parameter is not a number" })
      return
    } else {
      meals = meals.limit(`${request.query.limit}`);
    }
  }

  //sort_key	String	Returns all meals sorted by the given key. Allows when, max_reservations and price as keys.
  //  Default sorting order = asc.	api/meals?sort_key=price


  if ('sort_key' in request.query) {
    const sortKeys = new Set(['price', 'when', 'max_reservations'])

    // sort_dir	String	Returns all meals sorted in the given direction. Only works combined with the sort_key and allows asc or desc.
    // 	api/meals?sort_key=price&sort_dir=desc

    if (sortKeys.has(request.query.sort_key) && ('sort_dir' in request.query)) {
      meals = meals.orderBy(`${request.query.sort_key}`, `${request.query.sort_dir}`);
    } else {
      (sortKeys.has(request.query.sort_key))
      meals = meals.orderBy(`${request.query.sort_key}`, 'asc');
    }
  }

  const mealResults = await meals
  response.json(mealResults)
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