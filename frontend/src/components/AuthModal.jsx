import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie] = useCookies(null)

    const navigate = useNavigate()

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isSignUp && password !== confirmPassword) {
            setError('Passwords need to match!')
            return
        }

        try {
            const response = await axios.post(
                `https://dating-app-project-backend.onrender.com/${isSignUp ? 'signup' : 'login'}`,
                { email, password }
            )

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
            if (success) {
                navigate(isSignUp ? '/onboarding' : '/dashboard')
                window.location.reload()
            }
        } catch (error) {
            console.error(error)
            setError('Something went wrong. Please try again.')
        }
    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>

            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>
                By clicking Log In, you agree to our terms. Learn how we process your data
                in our Privacy Policy and Cookie Policy.
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && (
                    <input
                        type="password"
                        id="password-check"
                        name="password-check"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                )}
                <input className="secondary-button" type="submit" value={isSignUp ? 'Sign Up' : 'Log In'} />
                {error && <p className="error-message">{error}</p>}
            </form>

            <hr />
            <h2>GET THE APP</h2>
        </div>
    )
}

export default AuthModal
