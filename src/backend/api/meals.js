//const { json } = require("body-parser");
const express = require("express");
const { response } = require("../app");
const router = express.Router();
const knex = require("../database");


//  /api/meals/:meal_id/reviews	GET	Returns all reviews for a specific meal.
//  Reviews

router.get("/:meal_id/reviews", async (request, response) => { 


  let mealReviews = await knex("Review").select().where({ "Review.meal_id": request.params.meal_id })


  if (mealReviews.length > 0) {
    response.json(mealReviews)
  } else {
    response.status(404).json({ error: "Review Not found" })
  }
})




router.get("/", async (request, response) => {

  // maxPrice	Number	Returns all meals that are cheaper than maxPrice.	api/meals?maxPrice=90

  if ("maxPrice" in request.query) {
    if (isNaN(request.query.maxPrice)) {

      response.status(404).json({ error: "max price is not a number" });

    } else {
      const maxPriceMeals = await knex("meals").select().where('meals.price', '<', `${request.query.maxPrice}`);

      response.json(maxPriceMeals);
    }

  }

  // availableReservations	Boolean	Returns all meals that still have available spots left. 
  // *	api/meals?availableReservations=true

  // SQL 
  /* SELECT meals.id,meals.title, max_reservations, (meals.max_reservations - COALESCE(SUM(Reservation.number_of_guests),0)
) AS available_reservations FROM meals 
LEFT  join Reservation ON  meals.id = Reservation.meal_id
GROUP BY meals.id
having (available_reservations > 0); */

  // KNEX
  // const availableReservations = await knex('meals').select().where('max_reservations', '-', 'COALESCE(SUM(Reservation.number_of_guests),0)', 'AS', 'available_reservations');
  // .leftjoin("Reservation", "meals.id ", "Reservation.meal_id")
  //
  //  .GROUPBY('meals.id').having('available_reservations', '>', '0');

  if (('availableReservations' in request.query) && typeof request.query.availableReservations == "boolean") {
    if (request.query.availableReservations == "true") {
      res.json(availableReservations);

    } else {
      response.status(404).json({ error: "Not found reservation" })
    }



  // title	String	Returns all meals that partially match the given title. 
  // Rød grød will match the meal with the title Rød grød med fløde.api/meals?title=Indian%20platter

  if ('title' in request.query) {

    const titleMatch = await knex("meals").select().where('meals.title', 'like', `%${request.query.title}%`);

    if (typeof request.query.title === 'string' && titleMatch.length > 0) {

      response.json(titleMatch);

    } else {
      response.status(404).json({ error: " Title is not string or No match" })

    }
  }

  // dateAfter	Date	Returns all meals where the date for when is after the given date.
  //	api/meals?dateAfter=2022-10-01



  if ('dateAfter' in request.query) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    const dateAfterMatch = await knex("meals").select().where('meals.when', '>', `${request.query.dateAfter}`);

    if (request.query.dateAfter.match(regEx) && dateAfterMatch.length > 0) {

      response.json(dateAfterMatch);
    } else {
      response.status(404).json({ error: "Match Not found" })

    }
  };

  // dateBefore	Date	Returns all meals where the date for when is before the given date.
  //	api/meals?dateBefore=2022-08-08

  if ('dateBefore' in request.query) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    const dateBeforeMatch = await knex("meals").select().where('meals.when', '<', `${request.query.dateBefore}`);

    if (request.query.dateBefore.match(regEx) && dateBeforeMatch.length > 0) {

      response.json(dateBeforeMatch);
    } else {
      response.status(404).json({ error: "Match Not found" })

    }
  };
  //  limit	Number	Returns the given number of meals.	api/meals?limit=7
  if (Object.keys(request.query).includes('limit')) {

    if (isNaN(request.query.limit)) {
      response.status(404).json({ error: "requested query parameter is not a number" })

    } else {
      const limitQuery = await knex("meals").select().limit(`${request.query.limit}`);

      response.json(limitQuery);
    }
  }

  //sort_key	String	Returns all meals sorted by the given key. Allows when, max_reservations and price as keys.
  //  Default sorting order = asc.	api/meals?sort_key=price


  if ('sort_key' in request.query) {
    const sortKeys = new Set(['price', 'when', 'max_reservations'])

    // sort_dir	String	Returns all meals sorted in the given direction. Only works combined with the sort_key and allows asc or desc.
    // 	api/meals?sort_key=price&sort_dir=desc

    if (sortKeys.has(request.query.sort_key) && ('sort_dir' in request.query)) {
      const sortDir = await knex("meals").select().orderBy(`${request.query.sort_key}`, `${request.query.sort_dir}`);
      response.json(sortDir);
    } else if (sortKeys.has(request.query.sort_key)) {
      const sortDirAsc = await knex("meals").select().orderBy(`${request.query.sort_key}`, 'asc');

      response.json(sortDirAsc);
    }

    else {
      response.status(404).json({ error: "error" })

    }
  }

});




module.exports = router;
