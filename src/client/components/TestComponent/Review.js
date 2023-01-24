import React, { useState, useEffect } from 'react'
import ReviewForms from './AddReview.js';
import NavBar from './NavBar.js';
import Footer from './Footer.js';

const API = "/api/reviews";

const Review = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function FetchReview() {
            const fetchData = await fetch(API)
            const reviewFetch = await fetchData.json()
            setReviews(reviewFetch)
        }
        FetchReview()
    }, [])


    return (
        <div>
            <NavBar />
            <div className="review-wrap">
                {reviews.map((review) => {

                    return (
                        <div className="review-list" key={review.id}>
                            <h2>{review.title}</h2>
                            <h5>{review.description}</h5>

                        </div>
                    )
                }
                )}

            </div>
            <ReviewForms />
            <Footer />
        </div>
    )
}

export default Review