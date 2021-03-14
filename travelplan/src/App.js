import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";



// import ShowReviews from './pages/ShowReviews'
// import CreateReview from './pages/CreateReview'
import HomeNavBar from './HomeNavBar'
import Homepage from './pages/Homepage';
import Australia from './pages/Australia';
import Japan from './pages/Japan';
import Korea from './pages/Korea';
import Taiwan from './pages/Taiwan';
import Thailand from './pages/Thailand';


function App() {
    return (
        <Router>
            <HomeNavBar/>
            <Switch>
                <Route exact path="/">
                    <Homepage/>
                </Route>
                <Route exact path="/australia">
                    <Australia />
                </Route>
                <Route exact path="/japan">
                    <Japan />
                </Route>
                <Route exact path="/korea">
                    <Korea />
                </Route>
                <Route exact path="/taiwan">
                    <Taiwan />
                </Route>
                <Route exact path="/thailand">
                    <Thailand />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
