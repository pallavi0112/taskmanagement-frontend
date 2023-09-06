import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Task from '../Pages/Task'
import Home from '../Pages/Home'
import LoginForm from '../component/Form/LoginForm'
import Register from '../component/Form/Register'
import ProtectedRoute from './ProtectedRoute'
const Routing = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/task' element={<ProtectedRoute Componet={Task}/>}/>
        <Route exact path='/login' element={<LoginForm/>}/>
        <Route exact path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default Routing