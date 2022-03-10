import { createContext, useContext, useState } from "react"

const useAuth = () => {
    const user = { loggedIn: false }
    return user && user.loggedIn
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = () => {
        setIsAuthenticated(true)
    }
    const logout = () => {
        setIsAuthenticated(false)
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}