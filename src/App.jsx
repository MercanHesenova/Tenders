import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TenderCreate from './pages/TenderCreate';
import CreatedTenders from './pages/CreatedTenders';
import TenderDetail from './pages/TenderDetail';
import TenderApply from './pages/TenderApply';
import Header from './components/Header';
import Footer from './components/Footer';
import DataProvider from './context/Context';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatedApply from './pages/CreatedApply';
function App() {
  return (
    <DataProvider>
      <Header></Header>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
        <Route path='/tender-detail/:id' element={<TenderDetail/>}></Route>
        <Route path='/tender-apply/:id' element={<TenderApply/>}></Route>
        <Route path='/tender-create' element={<TenderCreate/>}></Route>
        <Route path='/created-tender' element={<CreatedTenders/>}></Route>
        <Route path='/sign-in' element={<SignIn/>}></Route>
        <Route path='/sign-up' element={<SignUp/>}></Route>
      </Routes>
      <Footer></Footer>
    </DataProvider>
  )
}

export default App
