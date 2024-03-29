import { createContext, useState, useEffect } from "react"; // Context: create global function using this context
import axios from "axios";
import { useRouter } from "next/router";

const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()
  
    useEffect(() => {
        checkIfUserLoggedIn()
    }, [])

    //Login User     

    const login = async({username, password}) => {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    
        const body = {
            username,
            password
        }

        try {

            const { data:accessResponse } = await axios.post('http://localhost:3000/api/login', body, config)
            
            if (accessResponse && accessResponse.user) {
                setUser(accessResponse.user)
            }

            if (accessResponse && accessResponse.access) {
                setAccessToken(accessResponse.access)
            }

            router.push('/')

        } catch(error) {
            
            if (error.response && error.response.data) {
                setError(error.response.data.message)
                return
              } else if (error.request) {
                setError('Something went wrong')
                return
              } else {
                setError('Something went wrong')
                return
              }

              console.error('Error', error.message);
              setError('Somethin went wrong')     
              return            
        }        
    
    }

    const register = async ({ username, email, password, password2}) => {

        if (password !== password2) {
            setError('Passwords do not match')
            return
        }
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    
        const body = {
            username,
            email,
            password
        }

        try {
            // call next js api function to create a user
           await axios.post('http://localhost:3000/api/register', body, config)
           login ({username, password})
        } catch(error) {
            
            if (error.response && error.response.data) {
                setError(error.response.data.message)
                return
              } else if (error.request) {
                setError('Something went wrong')
                return
              } else {
                setError('Something went wrong')
                return
              }

              console.error('Error', error.message);
              setError('Somethin went wrong')     
              return            
        }
    }

    const logout = async () => {
        try {
            // Remove the http cookie

            await axios.post('http://localhost:3000/api/logout')

            // remove the access token and the user from the state

            setUser(null)
            setAccessToken(null)

        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message)
                return
              } else if (error.request) {
                setError('Something went wrong')
                return
              } else {
                setError('Something went wrong')
                return
              }

              console.error('Error', error.message);
              setError('Somethin went wrong')     
              return    
        }
    }

    const checkIfUserLoggedIn = async () => {
      
        try {
              // api request to api/iser in nextjs
            const { data } = await axios.post('http://localhost:3000/api/user')
         
            // set user and access token in state

            setUser(data.user)
            setAccessToken(data.access)

        } catch(error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message)
                return
              } else if (error.request) {
                setError('Something went wrong')
                return
              } else {
                setError('Something went wrong')
                return
              }

              console.error('Error', error.message);
              setError('Somethin went wrong')     
              return 
        }
        
    }

    const clearError = () => {
        setError(null)
    }

    return (
        <AuthenticationContext.Provider value={{ user, accessToken, error, login, register, logout, clearError }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext
