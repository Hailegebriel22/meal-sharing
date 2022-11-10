import React, { useState } from 'react';
import CreatedDate from "./ReservationForm";
const ReviewForms = (props) => {
    console.log(props)
    const [title, seTtitle] = useState("")
    const [description, setDescription] = useState("")
    const [mealid, setMealid] = useState("")
    const [stars, setStars] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        postReview()
        seTtitle("");
        setDescription("");
        setMealid("");
        setStars("");
    };

    function postReview() {
        (async () => {
            await fetch('/api/review', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    meal_id: mealid,
                    stars: stars,
                    created_date: CreatedDate(),

                })
            })

        })();

    }

    return (
        <div className="form-wrapper">

            <form className="form" type="submit">
                <em>your review is essential to improve our customer service.</em>
                <h5>Add Review</h5>
                <input type="text" value={title} onChange={(e) => seTtitle(e.target.value)} placeholder="Review title" />
                <textarea name="Text1" cols="30" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input type="number" value={mealid} onChange={(e) => setMealid(e.target.value)} placeholder="Meal-id" />
                <input type="number" value={stars} onChange={(e) => setStars(e.target.value)} placeholder="Rating stars" min="1" max="5" />
                <button className="addreview-btn" type="submit" onClick={onSubmit}> Submit </button>
            </form>
        </div >
    )
}

export default ReviewForms;