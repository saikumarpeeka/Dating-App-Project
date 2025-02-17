import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import { useState } from 'react'

const ChatContainer = ({ user }) => {
    // State to track the selected user for chat
    const [clickedUser, setClickedUser] = useState(null)

    return (
        <div className="chat-container">
            {/* Display chat header */}
            <ChatHeader user={user} />

            {/* Chat navigation buttons */}
            <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>

            {/* Show matches if no user is selected, otherwise show chat display */}
            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />}
            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
        </div>
    )
}

export default ChatContainer

