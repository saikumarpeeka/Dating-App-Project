import React, { useState } from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)

    const authToken = false // Placeholder for authentication logic

    // Handle button click to open modal
    const handleClick = () => {
        console.log('clicked')
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            {/* Navigation Bar */}
            <Nav 
                minimal={false} 
                setShowModal={setShowModal} 
                showModal={showModal} 
                setIsSignUp={setIsSignUp} 
            />

            {/* Home Page Content */}
            <div className="home">
                <h1 className="primary-title">Where hearts meet, the Desi way</h1>

                {/* Button for Authentication */}
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {/* Authentication Modal */}
                {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />}
            </div>
        </div>
    )
}

export default Home
