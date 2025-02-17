import { useCookies } from 'react-cookie'

const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    // Logout function to remove cookies and refresh the page
    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
    }

    return (
        <div className="chat-container-header">
            {/* User Profile Section */}
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"photo of " + user.first_name} />
                </div>
                <h3>{user.first_name}</h3>
            </div>
            
            {/* Logout Icon */}
            <i className="log-out-icon" onClick={logout}>⇦</i>
        </div>
    )
}

export default ChatHeader
