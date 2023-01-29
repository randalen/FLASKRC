import { useState } from 'react'
import {Projects, Collections, Home, Login, Subscribe, Profile} from './components';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home2 from './components/Home2';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/subscribe' element={<Subscribe />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/projects' element={<Projects />}/>
          <Route path='/collections' element={<Collections />}/> 
          <Route path='/login' element={<Login />}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App
