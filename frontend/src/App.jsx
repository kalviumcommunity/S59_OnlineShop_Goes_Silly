import React from 'react'
import NavBar from './Components/NavBar'
import HomePage from './Components/HomePage'
import './App.css'
import Footer from './Components/Footer'
import Products from './Components/Products'
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
        <Route path='/AddProduct' element = {<AddProduct/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
