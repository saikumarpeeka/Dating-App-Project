import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<Home />} />

        {/* Dashboard Page Route */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Onboarding Page Route */}
        <Route path="onboarding" element={<OnBoarding />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
