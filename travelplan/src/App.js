import './App.css';
import React from 'react'
// import react router 
// import { BrowserRouter as Router} from "react-router-dom"

// import CreateReview from './pages/CreateReview'
// import ShowReviews from './pages/ShowReviews'
import Header from './Header'

import Homepage from './pages/Homepage';


function App() {
    return (
        <React.Fragment>
            <Header/>
            <Homepage/>
            {/* <CreateReview/> */}
            {/* <ShowReviews/> */}
            
        </React.Fragment>
    );
}

export default App;
