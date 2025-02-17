import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../components/ChatContainer'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState(null)
    const [cookies] = useCookies(['user'])

    const userId = cookies.UserId

    // Fetch logged-in user details
    const getUser = async () => {
        try {
            const response = await axios.get('https://dating-app-project-backend.onrender.com/user', {
                params: { userId }
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch users based on gender preference
    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('https://dating-app-project-backend.onrender.com/gendered-users', {
                params: { gender: user?.gender_interest }
            })
            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch user data on component mount
    useEffect(() => {
        getUser()
    }, [])

    // Fetch gendered users after user data is loaded
    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])

    // Update matches when a user swipes right
    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('https://dating-app-project-backend.onrender.com/addmatch', { userId, matchedUserId })
            getUser() // Refresh user data after updating matches
        } catch (err) {
            console.log(err)
        }
    }

    // Handle swipe action
    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    // Handle when card leaves the screen
    const outOfFrame = (name) => {
        console.log(`${name} left the screen!`)
    }

    // Get matched user IDs to filter them out from potential matches
    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId)

    // Filter out already matched users
    const filteredGenderedUsers = genderedUsers?.filter(
        (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
    )

    return (
        <>
            {user && (
                <div className="dashboard">
                    {/* Chat Section */}
                    <ChatContainer user={user} />

                    {/* Swipe Section */}
                    <div className="swipe-container">
                        <div className="card-container">
                            {filteredGenderedUsers?.map((genderedUser) => (
                                <TinderCard
                                    className="swipe"
                                    key={genderedUser.user_id}
                                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                                >
                                    <div
                                        style={{ backgroundImage: `url(${genderedUser.url})` }}
                                        className="card"
                                    >
                                        <h3>{genderedUser.first_name}</h3>
                                    </div>
                                </TinderCard>
                            ))}

                            {/* Show last swipe direction */}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard
