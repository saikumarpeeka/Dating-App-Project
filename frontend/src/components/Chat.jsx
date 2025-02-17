const Chat = ({ descendingOrderMessages }) => {
    return (
        <div className="chat-display">
            {descendingOrderMessages.map((message, index) => (
                <div key={index} className="chat-message">
                    <div className="chat-message-header">
                        <div className="img-container">
                            <img src={message.img} alt={`${message.name} profile`} />
                        </div>
                        <p>{message.name}</p>
                    </div>
                    <p className="chat-text">{message.message}</p>
                </div>
            ))}
        </div>
    )
}

export default Chat

