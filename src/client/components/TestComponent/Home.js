import React from 'react'
import IntroductionSection from './IntroductionSection.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'

const Home = () => {
    return (
        <div>
            <NavBar />
            <div className="image-container">
                <img className="home-image" src="https://www.yorku.ca/foodservices/wp-content/uploads/sites/50/2022/09/Copy-of-Diet.png" />
                <h1 className="image-text">Welcome to Meal-Sharing</h1>
            </div>
            <IntroductionSection />
            <Footer />
        </div >
    )
}

export default Home