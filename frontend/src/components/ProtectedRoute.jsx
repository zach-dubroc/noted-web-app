//wrapper for a protected route
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

//check if authorized or redirect
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(()=>{
        auth().catch(() => setIsAuthorized(false))
    }, [])
    const refreshToken = async () => {
        //gets refresh token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("api/token/refresh/", { refresh: refreshToken })
            //check status code
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.status.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } 
        
        catch (error) {
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        //check for token
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        //decode token
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000
        //check if token exipred
        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute




