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

        number_of_guests: request.body.number_of_guests || "Untitled",
        meal_id: request.body.description || "No contents",
        created_date: request.body.created_date,
        contact_phonenumber: request.body.contact_phonenumber,
        contact_name: request.body.contact_name,
        contact_email: request.body.contact_email
    })
    if (reviewsId === 0) {
        res.status(404).json({ message: 'No reviews' })
    } else {
        response.status(201).json({ message: "Created reviews", id: reviewsId })
    }
})

// /api/reviews/:id	GET	Returns the reviews by id

router.get("/:id", async (request, response) => {


    let reviewsQuery = await knex.select('*').from(`Review`).where({ "Review.id": request.params.id }).limit(1)


    if (reviewsQuery.length > 0) {
        response.json(reviewssQuery)
    } else {
        response.status(404).json({ error: "Review Not found" })
    }
})
// /api/reviews/:id	PUT	Updates the reviews by id
router.put('/:id', async (request, response) => {

    const updatedReview = await knex('Review').where({ "id": request.params.id }).update({

        number_of_guests: request.body.number_of_guests || "Untitled",
        meal_id: request.body.description,
        created_date: request.body.created_date,
        contact_phonenumber: request.body.contact_phonenumber,
        contact_name: request.body.contact_name,
        contact_email: request.body.contact_email
    })
    if (updatedReview === 0 || updatedReview === 'undefined') {
        response.status(404).json({ error: "unable to update review" })
    } else {
        response.status(201).json({ id: request.params.id, message: "Review updated", })
    }
});

//   /api/reviews/:id	DELETE	Deletes the review by id
router.delete('/:id', async (request, response) => {


    reviewToDelete = await knex('Review').where({ "id": request.params.id }).del();
    if (reviewToDelete === 0 || reviewToDelete === 'undefined') {
        response.status(404).json({ error: "unable to delete" })
    } else {
        response.status(201).json({ id: request.params.id, message: "Rreview deleted" })
    }

});



module.exports = router;