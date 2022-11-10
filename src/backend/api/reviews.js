const express = require("express");
const router = express.Router();
const knex = require("../database");


router.get("/", async (request, response) => {
    try {
        const reviews = await knex("Review").select();
        response.json(reviews);
    } catch (error) {
        throw error;
    }
});



// /api/reviews	POST	Adds a new reservation to the database

router.post('/', async (request, response) => {


    const [reviewsId] = await knex("Review").insert({

        title: request.body.title || "Untitled",
        description: request.body.description,
        meal_id: request.body.description,
        stars: request.body.stars,
        created_date: request.body.created_date
    })
    try {
        response.status(201).json({ message: "Created reviews", id: reviewsId });
    } catch (error) {
        throw error;
    }


})

// /api/reviews/:id	GET	Returns the reviews by id

router.get("/:id", async (request, response) => {


    let reviewsQuery = await knex.select('*').from(`Review`).where({ "Review.id": request.params.id }).limit(1)


    if (reviewsQuery.length > 0) {
        response.json(reviewsQuery)
    } else {
        response.status(404).json({ error: "Review Not found" })
    }
})
// /api/reviews/:id	PUT	Updates the reviews by id
router.put('/:id', async (request, response) => {

    const updatedReview = await knex('Review').where({ "id": request.params.id }).update({
        title: request.body.title || "Untitled",
        description: request.body.description,
        meal_id: request.body.description,
        stars: request.body.stars
    })
    if (updatedReview === 0 || typeof updatedReview === 'undefined') {
        response.status(404).json({ error: "unable to update review" })
    } else {
        response.status(204).json({ id: request.params.id, message: "Review updated", })
    }
});

//   /api/reviews/:id	DELETE	Deletes the review by id
router.delete('/:id', async (request, response) => {


    reviewToDelete = await knex('Review').where({ "id": request.params.id }).del();
    if (reviewToDelete === 0 || reviewToDelete === 'undefined') {
        response.status(404).json({ error: "unable to delete a review" })
    } else {
        response.status(204).json({ id: request.params.id, message: "Review deleted" })
    }

});



module.exports = router;