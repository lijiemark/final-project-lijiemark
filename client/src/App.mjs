import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.mjs';
import SignUp from './components/SignUp.mjs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  )
}

export default App