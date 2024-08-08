import React from 'react'
import './App.css'
import Context from './context/Context'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TenderDetail from './pages/TenderDetail';
import TenderApply from './pages/TenderApply';
import TenderCreate from './pages/TenderCreate';
import CreatedTenders from './pages/CreatedTenders';
function App() {

  return (
    <Context.Provider>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/tender-detail/:id' element={<TenderDetail />}></Route>
        <Route path='/tender-apply/:id' element={<TenderApply />}></Route>
        <Route path='/tender-create' element={<TenderCreate />}></Route>
      </Routes>
    </Context.Provider>
  )
}

export default App
