import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container} from 'reactstrap'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io";

export default class Plan extends React.Component {
    state = {
        all_reviews:[],
        all_country:[],
    }

    // async componentDidMount() {
    //     let all = await axios.get(baseUrl + '/plan') 
    //     this.setState({
    //         'all_reviews':all.data[0],
    //         'all_country':all.data[1]
    //     })
    // }
    render() {
        return (
            <React.Fragment>
                
                    <div></div>
                    <div className="country-btns">
                        <button value="Australia" className="country-btn" onClick={this.filterBtn}>Australia</button>
                        <button value="Japan" className="country-btn" onClick={this.filterBtn}>Japan</button>
                        <button value="Korea" className="country-btn" onClick={this.filterBtn}>South Korea</button>
                        <button value="Taiwan" className="country-btn" onClick={this.filterBtn}>Taiwan</button>
                        <button value="Thailand" className="country-btn" onClick={this.filterBtn}>Thailand</button>
                    </div>
                
            </React.Fragment>
        )
    }
}