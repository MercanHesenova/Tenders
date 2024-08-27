import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TenderCreate from './pages/TenderCreate';
import CreatedTenders from './pages/CreatedTenders';
import TenderDetail from './pages/TenderDetail';
import TenderApply from './pages/TenderApply';
import CreatedApply from './pages/CreatedApply';
import Header from './components/Header';
import Footer from './components/Footer';
import DataProvider from './context/Context';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  return (
    <DataProvider>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/tender-detail/:id' element={<TenderDetail />}></Route>
        <Route path='/tender-apply/:id' element={<TenderApply /> }></Route>
        <Route path='/applied-tender' element = {isLoggedIn? <CreatedApply/>: <Navigate to="/sign-in" />}></Route>
        <Route path='/tender-create' element={isLoggedIn ? <TenderCreate /> : <Navigate to="/sign-in" />}></Route>
        <Route path='/created-tender' element={isLoggedIn ? <CreatedTenders /> : <Navigate to="/sign-in" />}></Route>
        <Route path='/sign-in' element={!isLoggedIn ? <SignIn /> : <Navigate to="/"/>}></Route>
        <Route path='/sign-up' element={!isLoggedIn ? <SignUp /> : <Navigate to="/"/>}></Route>
      </Routes>
      <Footer></Footer>
    </DataProvider>
  )
}

export default App
