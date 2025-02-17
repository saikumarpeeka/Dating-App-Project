import React from 'react'
import whitelogo from '../assets/white-logo.png'
import colorlogo from '../assets/color-logo.png'
const Nav = ({minimal, setShowModal, showModal, setIsSignUp}) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }


    const authToken = false
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? colorlogo : whitelogo}/>
            </div>
            {!authToken && !minimal && <button
             className="nav-button"
             onClick={handleClick}
             disabled={showModal}
             >Log in</button>}
        </nav>
      )
    }

export default Nav
