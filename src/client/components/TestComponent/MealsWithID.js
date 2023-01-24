import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Footer from './Footer.js';
import NavBar from './NavBar.js';
import images from './images.js';
import AvailableReservations from './AvailableReservations.js';

const API = "/api/meals"

const MealsWithId = ({ meals, setMeals }) => {

    useEffect(() => {
        async function DataFetched() {
            const fetchdata = await fetch(API)
            const responseFetch = await fetchdata.json()
            console.log(responseFetch)
            setMeals(responseFetch)
        }

        DataFetched()
    }, [])

    const params = useParams()

    const meal = meals.find((meal) => meal.id == Number(params.id))
    if (meal === undefined) {
        return null
    }

    const mealImages = images.find((img) => img.id === meal.id)
    return (
        <div className="reservation-wrapper" >
            <NavBar />
            <div className="mealsWithId-form">
                <img src={mealImages.img} className="meal-image" />
                <h2>{meal.title} </h2>
                <h5>{meal.description}</h5>
                <h5>Location: {meal.location}</h5>
                <h5>Price: {meal.price} DKK</h5>
            </div>
            <AvailableReservations mealId={meal.id} />
            <Footer />
        </div>
    )
}

export default MealsWithId