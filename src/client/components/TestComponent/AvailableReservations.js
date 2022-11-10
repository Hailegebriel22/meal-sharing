import React, { useState, useEffect } from 'react'
import ReservationForm from './ReservationForm.js'


const AvailableReservations = (props) => {
    console.log(props.mealId)
    const [show, setShow] = useState(false)
    const [reservation, setReservation] = useState([])
    console.log(reservation)

    const AvailableMealsAPI = "/api/meals?availableReservations=true"

    useEffect(() => {
        async function AvailableMeals() {
            const fetchMeals = await fetch(AvailableMealsAPI)
            const responseFetchMeals = await fetchMeals.json()
            setReservation(responseFetchMeals)
            console.log(responseFetchMeals)
        }
        AvailableMeals()

    }, []);

    const findReservation = async () => {
        const mealReservation = await reservation.find((reservation) => (reservation.id === Number(props.mealId)))
        console.log({ mealReservation })
        if (mealReservation === undefined) {
            setShow(false)
        } else {
            const reservation_total = await mealReservation.total_reservations
            const reservation_max = await mealReservation.max_reservations
            console.log(reservation_max)
            if (reservation_total >= reservation_max) {
                setShow(false)
            } else {
                setShow(true)
            }
        }

    }
    findReservation()
    return (
        <div>
            {show === false && <p className="unavailable-message">Sorry no available reservations </p>}
            {show && <ReservationForm mealId={props.mealId} />}
        </div>
    )
}

export default AvailableReservations;