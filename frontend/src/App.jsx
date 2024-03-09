import React from 'react'
import NavBar from './Components/NavBar'
import HomePage from './Components/HomePage'
import './App.css'
import Footer from './Components/Footer'
import UpdateProduct from './Components/UpdateProduct'
import SignUp from './Components/SignUp'
import AddProduct from './Components/AddProduct'
import { Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/AddProduct' element={<AddProduct />} />
        <Route path='/UpdateProduct' element={<UpdateProduct />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
