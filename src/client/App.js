import React from "react";
import { BrowserRouter as Router,Routes, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsWithID from "./components/TestComponent/MealsWithID";
import Home from "./components/TestComponent/Home";
import Meals from './components/TestComponent/Meals';
import { useState } from "react";
import "./App.css";
import AddMeal from "./components/TestComponent/AddMeal";
//import NavBar from "./components/TestComponent/NavBar";
function App() {
  const [meals, setMeals] = useState([]);

  return (
    // <Router>
    
    <Routes>
                <Route exact path="/" element={<Home/>} />  
               

        {/* //<NavBar /> */}
        {/* <Route exact path="/meals" element={<TestComponent />} /> */}

      

      {/* <Route exact path="/meals/:id">
          <MealsWithID meals={meals} setMeals={setMeals} />
        </Route> */}
      {/*<Route exact path="/test-component">
        <TestComponent></TestComponent>

      </Route> */}
      <Route exact path="/meals" element={<Meals meals={meals} setMeals={setMeals}/>}/> 

      <Route exact path="/meals/:id" element={<MealsWithID meals={meals} setMeals={setMeals}/>} />
      <Route exact path="/meals/add-meal" element={<AddMeal meals={meals} setMeals={setMeals}/>} />

    </Routes>
    // </Router>
  );
}

export default App;
