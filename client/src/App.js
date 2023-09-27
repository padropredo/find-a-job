import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Login/LoginPage';
import CompanyPage from './Pages/Company/CompanyPage';
import CandidatePage from './Pages/Candidate/CandidatePage';


const App = () => {

  const [searchTerm, setSearchTerm] = useState([]);



  return (
    <Router>
      <Routes>
        <Route exact path='/'  element={<LoginPage />} />
        <Route path='/company' element={<CompanyPage />} />
        <Route path='/candidate' element={<CandidatePage />} />
      </Routes>
    </Router>
  );
}

export default App;