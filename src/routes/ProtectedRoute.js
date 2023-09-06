import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({Componet}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem('isloggedIn'))){
             navigate('/login')
        }
    },[JSON.parse(localStorage.getItem('isloggedIn'))])
  return (
    <Componet/>
  )
}

export default ProtectedRoute