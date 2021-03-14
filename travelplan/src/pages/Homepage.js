import React from 'react'



export default class Homepage extends React.Component {
    state = {

    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <h3>Popular Destinations</h3>
                    <button>Australia</button>
                    <button Link to="/japan">Japan</button>
                    <button Link to="/korea">Korea</button>
                    <button Link to="/taiwan">Taiwan</button>
                    <button Link to="/thailand">Thailand</button>
                </div>
                <div>
                    <h3>Places & Experiences</h3>
                </div>
            </React.Fragment>
        )
    }
}



