import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import User from './components/pages/User';
import QuestionCreate from './components/pages/QuestionCreate';
import Question from './components/pages/Question';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/questions/new" element={<QuestionCreate />} />
        <Route path="/questions/:id" element={<Question />} />
      </Routes> 
    </Router>
  );
}

export default App;
