import React from 'react'
import NavBar from './Components/NavBar'
import HomePage from './Components/HomePage'
import './App.css'
import Footer from './Components/Footer'
import SignUp from './Components/SignUp'
import { useState } from 'react'
import AddProduct from './Components/AddProduct'
import { Route, Routes } from 'react-router-dom'
import FindProduct from './Components/FindProduct'
import UpdateProduct from './Components/UpdateProduct'
import Login from './Components/Login'
import OpenStore from './Components/OpenStore'
function App() {
  const [logged, setlog] = useState(false)
  return (
    <>
      <NavBar logged = {logged} setlog = {setlog}/>
      <Routes>
        <Route path='/' element={<HomePage logged = {logged} />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Login' element={<Login setlog = {setlog} logged = {logged}/>} />
        <Route path='/AddProduct' element={<AddProduct />} />
        <Route path='/FindProduct' element={<FindProduct />} />
        <Route path='/UpdateProduct/:name' element={<UpdateProduct />} />
        <Route path='/OpenStore' element={<OpenStore />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
