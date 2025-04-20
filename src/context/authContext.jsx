import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const userContext = createContext()
const navigate = useNavigate
const AuthContext = ({children}) => {
    const [user,setUser] =useState(null)
    const[loading,setLoading] = useState(true)
    useEffect(() =>{
      const verifyUser = async () =>{
        
        try {
          const token = localStorage.getItem('token')
          if (token) {
          const response = await axios.get('http://localhost:3005/api/auth/verify',{
            Headers:{
              "Authorization" : `Bearer ${token}`
            }
          })
          if(response.data.success){
            setUser(response.data.user)
          }
        }else{
          navigate('/login')
        }
        } catch (error) {
          if(error.response && !error.response.data.error){
            navigate('/login')
          }
        }finally{
          setLoading(false)
        }
      }
      verifyUser()
    },[])
    const login = (user) =>{
      setUser(user)
    }
    const logout = () =>{
        setUser(null)
        localStorage.removeItem("token")
    }
  return (
  <userContext.Provider value={{user, login ,logout,loading}}>
    {children}
  </userContext.Provider>
  )
}
export const useAuth =() => useContext(userContext)
export default AuthContext
