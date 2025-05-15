import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Landing from './pages/landing'
import Loginsignup from './pages/login_signup'
import HomePage from './pages/home_page';
import AppLayout from './layouts/AppLayout';
import MainLayout from './layouts/MainLayout';

import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login_signup' element={<Loginsignup />} />
          <Route element={<AppLayout />}>
            <Route path='/home_page' element={<HomePage />} />
          </Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
