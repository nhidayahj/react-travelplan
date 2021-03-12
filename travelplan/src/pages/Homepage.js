import React from 'react'
import Header from '../Header';


export default class Homepage extends React.Component {
    state = {

    }
    render() {
        return (
            <React.Fragment>
                <Header/>
                <div>
                    <button>Australia</button>
                    <button Link to="/japan">Japan</button>
                    <button Link to="/korea">Korea</button>
                    <button Link to="/taiwan">Taiwan</button>
                    <button Link to="/thailand">Thailand</button>
                </div>
            </React.Fragment>
        )
    }
}



