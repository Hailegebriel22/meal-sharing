import React from "react";
import { BrowserRouter as Router,Routes, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsWithID from "./components/TestComponent/MealsWithID";
import Home from "./components/TestComponent/Home";
import Meals from './components/TestComponent/Meals';
import Review from "./components/TestComponent/Review";
import { useState } from "react";
import "./App.css";
import AddMeal from "./components/TestComponent/AddMeal";

function App() {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  return (    
    <Routes>
     <Route exact path="/" element={<Home/>} />              
     <Route exact path="/meals" element={<Meals meals={meals} setMeals={setMeals}/>}/> 
     <Route exact path="/meals/:id" element={<MealsWithID meals={meals} setMeals={setMeals}/>} />
     <Route exact path="/meals/add-meal" element={<AddMeal meals={meals} setMeals={setMeals}/>} />
     <Route exact path="/reviews" element={<Review reviews={reviews} setReviews={setReviews}/>} />
   </Routes>
  );
}

export default App;
