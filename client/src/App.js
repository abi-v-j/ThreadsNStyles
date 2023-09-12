import React from 'react'
import Admin from './Admin/App'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
   <div>
    <Routes>
      <Route path='/admin/*' element={<Admin/>}/>
    </Routes>
   </div>
  )
}

export default App
