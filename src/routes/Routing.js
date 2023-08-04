import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Task from '../Pages/Task'
import Home from '../Pages/Home'
const Routing = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/task' element={<Task/>}/>
    </Routes>
  )
}

export default Routing