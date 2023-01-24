import React, { useEffect} from 'react'
import { Link } from "react-router-dom";
import Footer from './Footer';
import NavBar from './NavBar';
//import './NavBar.css';
import images from './images';


const Meals = ({ meals, setMeals }) => {


    useEffect(() => {
        async function MealsDataFetched() {
            
            let ApiUrl = "/api/meals"
            const fetchdata = await fetch(ApiUrl)
            const responseFetch = await fetchdata.json()
            setMeals(responseFetch)
            console.log(meals)
        }

        MealsDataFetched()

    }, [])

    return (
        <div>
            <NavBar />
            <div className="meals-wrap">

                {meals.map((meal) => {
                    const mealImages = images.find((img) => img.id === meal.id)
                    return <div key={meal.id}>
                        < div style={{ width: '20rem' }} className="meals-wrap" >
                             <img  style={{ width: '18rem' }} src={mealImages.img} className="meal-image" /> 
                            <div >
                                <div>{meal.title}</div>
                                <div>{meal.description}</div>
                                <div>Location: {meal.location} </div>
                                <div>Price: {meal.price} DKK</div>

                                <Link to={`/meals/${meal.id}`}>
                                    <button className="booking-button">Book a Seat</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                })
                }
            </div >
            <div>
                <Link to={`/meals/add-meal`}>
                    <button className='add-meal'>Add Meal</button>
                </Link>
            </div>
            <Footer />
        </div>
    )
}

export default Meals