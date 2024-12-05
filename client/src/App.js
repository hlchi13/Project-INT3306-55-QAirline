import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Header from './components/Header/Header';
function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/> 
        </Routes>
      </div>
    </Router>

  );
}

export default App;