import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import User from './components/pages/User';
import QuestionCreate from './components/pages/QuestionCreate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/questions/new" element={<QuestionCreate />} />
      </Routes> 
    </Router>
  );
}

export default App;
