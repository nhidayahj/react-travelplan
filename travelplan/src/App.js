import './App.css';
import React from 'react'
// import react router 
import { BrowserRouter as Router} from "react-router-dom"

import HomeNavBar from './HomeNavBar'


function App() {
    return (
        <Router>
            <HomeNavBar/>
           
            
        </Router>
    );
}

export default App;
