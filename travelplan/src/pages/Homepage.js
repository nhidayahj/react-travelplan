import React from 'react'

function Homepage(props) {
    
    return (
        <React.Fragment>
            <h3>Popular Destinations</h3>
                <div>
                    <button props="">Australia</button>
                    <button>Japan</button>
                    <button>Korea</button>
                    <button>Taiwan</button>
                    <button>Thailand</button>
                </div>
                <div>
                    <h3>Places & Experiences</h3>
                    <button>Accommodation</button>
                    <button>Restaurants</button>
                    <button>Travel Activities</button>
                </div>
        </React.Fragment>
    )
}

export default Homepage;
