import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import { useState, useEffect } from "react"

const ChatDisplay = ({ user, clickedUser }) => {
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    // State for storing messages from both users
    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

    // Fetch messages sent by the current user
    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            })
            setUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch messages sent by the clicked user
    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }
            })
            setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch messages when the component mounts
    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
    }, [])

    const messages = []

    // Format current user's messages
    usersMessages?.forEach(message => {
        const formattedMessage = {
            name: user?.first_name,
            img: user?.url,
            message: message.message,
            timestamp: message.timestamp
        }
        messages.push(formattedMessage)
    })

    // Format clicked user's messages
    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {
            name: clickedUser?.first_name,
            img: clickedUser?.url,
            message: message.message,
            timestamp: message.timestamp
        }
        messages.push(formattedMessage)
    })

    // Sort messages in descending order based on timestamp
    const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <>
            {/* Chat messages display */}
            <Chat descendingOrderMessages={descendingOrderMessages} />
            
            {/* Chat input field */}
            <ChatInput 
                user={user} 
                clickedUser={clickedUser} 
                getUserMessages={getUsersMessages} 
                getClickedUsersMessages={getClickedUsersMessages} 
            />
        </>
    )
}

export default ChatDisplay
