import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <div>
            <div className="navBar">
                <img className='icon' src="https://image.shutterstock.com/image-vector/food-sharing-icon-vector-presented-260nw-1738540340.jpg" />
                <em>Meal-Sharing</em>
                <Link to="/">
                    Home
                </Link>
                <Link to="/meals">
                    Meals
                </Link>
                <Link to="/reviews">
                    Reviews
                </Link >
            </div>


        </div >
    )
}

export default NavBar;
