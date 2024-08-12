import React, { useEffect, useState } from 'react'
import './App.css'
import Context from './context/Context'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TenderDetail from './pages/TenderDetail';
import TenderApply from './pages/TenderApply';
import TenderCreate from './pages/TenderCreate';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreatedTenders from './pages/CreatedTenders';
import Footer from './components/Footer';

function App() {
  const tendersUrl = import.meta.env.VITE_TENDERS
  const [tenders, setTenders] = useState([])
  const getTenders = async () => {
    try {
      const response = await axios.get(tendersUrl);
      const tendersRes = response.data ? response.data : [];
      setTenders(tendersRes)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getTenders();
  }, []);
  const data = {
    tenders
  }
  return (
    <Context.Provider value={data}>
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
    </Context.Provider>
  )
}

export default App
