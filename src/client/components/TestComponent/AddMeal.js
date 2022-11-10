import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {CreatedDate} from "./ReservationForm"



export default function AddMeal() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [when, setWhen] = useState("");
    const [maxReservations, setmaxReservations] = useState("");
    const [price, setPrice] = useState("");


    function submitMeal(e) {
        e.preventDefault();
        fetch("/api/meals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                location: location,
                when: when,
                max_reservations: maxReservations,
                price: price,
                created: CreatedDate()

            }),
        }).then((response) => {
            if (!response.ok) {
                alert("Your meal has not added, Try agian");
            } else {
                alert("Meal Added");
            }
            setTitle("");
            setDescription("");
            setLocation("");
            setWhen("");
            setmaxReservations("");
            setPrice("");
        });
    }

    return (
        <div>
            <NavBar />
            <form className="add-form" onSubmit={submitMeal}>
                <h2>Add Meal To Our Menu</h2>
                <input
                    type="text"
                    placeholder="Meal Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="textarea"
                    placeholder="Meal Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <input
                    type="Date"
                    placeholder="When"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="max no of Reservations"
                    value={maxReservations}
                    onChange={(e) => setmaxReservations(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price ex 199"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <button className="addMeal-btn">submit</button>
                <div>
                    <Link to="/meals"><button className="addMeal-return-btn">return</button></Link>
                </div>
            </form>
            <Footer />
        </div>
    );
}
