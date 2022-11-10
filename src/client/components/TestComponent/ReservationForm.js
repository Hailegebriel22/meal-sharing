import React, { useState } from 'react'
import { Link } from "react-router-dom";

const CreatedDate = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
} 

const ReservationForm = (props) => {
    console.log(props)
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [guest, setGuest] = useState("")
    const [email, setEmail] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        postNewMeal()
        setName("");
        setPhoneNumber("");
        setGuest("");
        setEmail("");
    };

    function postNewMeal() {
        (async () => {
            await fetch('/api/reservations', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    number_of_guests: guest,
                    meal_id: props.mealId,
                    created_date: CreatedDate(),
                    contact_phonenumber: phoneNumber,
                    contact_name: name,
                    contact_email: email,
                })
            })

        })();

    }

    return (
        <div className="form-wrapper">
            <form className="form" type="submit">
                <h5>Reservation Form
                </h5>

                <div className="name">
                    <label>Full name</label>
                    <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                </div>

                <div className="phone-number">
                    <label>Phone number</label>
                    <input type="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone number" />
                </div>

                <div className="numberof-guest">
                    <label>Number Of Guest</label>
                    <input type="number" value={guest} onChange={(e) => setGuest(e.target.value)} placeholder="Enter number of guests" />
                </div>

                <div className="email">
                    <label>Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </div>

                <button className="form-button" type="submit" onClick={onSubmit}> Submit </button>
            </form>

            <Link className="back" to="/meals">
                <button className='return-btn'>Return</button>
            </Link>
        </div >
    )
}

export default ReservationForm;
export { CreatedDate };