import { useState } from 'react'
import axios from 'axios'

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    // Function to send a message
    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }

        try {
            await axios.post('http://localhost:8000/message', { message })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("") // Clear input after sending message
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="chat-input">
            {/* Textarea for typing messages */}
            <textarea 
                value={textArea} 
                onChange={(e) => setTextArea(e.target.value)}
            />
            
            {/* Submit button to send the message */}
            <button className="secondary-button" onClick={addMessage}>
                Submit
            </button>
        </div>
    )
}

export default ChatInput
