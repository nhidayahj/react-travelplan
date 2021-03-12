import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import ShowReviews from './pages/ShowReviews'

// import CreateReview from './pages/CreateReview'
import Homepage from './pages/Homepage';
import Australia from './pages/Australia';
import Japan from './pages/Japan';
import Korea from './pages/Korea';
import Taiwan from './pages/Taiwan';
import Thailand from './pages/Thailand';


function App() {
    return (
        <Router>
            {/* <CreateReview/> */}
            {/* <Homepage/> */}
            {/* <h3>Popular Destinations</h3> */}
            <nav>
                <div>
                    <button><Link to="/">Home</Link></button>
                    <button><Link to="/australia">Australia</Link></button>
                    <button><Link to="/japan">Japan</Link></button>
                    <button><Link to="/korea">Korea</Link></button>
                    <button><Link to="/taiwan">Taiwan</Link></button>
                    <button><Link to="/thailand">Thailand</Link></button>
                </div>
            </nav>

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

                {/* Experiences routes */}
                {/* <Route exact path="/acccommodation">
                    <Accommodation/>
                </Route>
                <Route exact path="/restaurant">
                    <Australia/>
                </Route>
                <Route exact path="/australia">
                    <Australia/>
                </Route> */}

            </Switch>
        </Router>
    );
}

export default App;
