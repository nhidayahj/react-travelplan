import React from 'react'
import {Container} from 'reactstrap'



export default class Homepage extends React.Component {
    state = {

    }
    render() {
        return (
            <React.Fragment>
                <div className="page-img">

                </div>
                <Container>

                    <div className="home-section">
                        <h3 className="page-title">Popular Destinations</h3>
                        <button>Australia</button>
                        <button Link to="/japan">Japan</button>
                        <button Link to="/korea">Korea</button>
                        <button Link to="/taiwan">Taiwan</button>
                        <button Link to="/thailand">Thailand</button>
                    </div>
                    <div className="home-section">
                        <h3 className="page-title">Places & Experiences</h3>
                    </div>
                </Container>
                
            </React.Fragment>
        )
    }
}



