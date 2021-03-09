import React from 'react'
import axios from 'axios'
import '../App.css'


const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io"


export default class Asia extends React.Component {
    state = {
        dbAsia:[],

    }

    async componentDidMount() {
        let response = await axios.get(baseUrl + "/allplaces");
        let result = response.data
        this.setState({
            dbAsia:result
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="asia-header">
                    <img src={require('../images/asia/asia.jpg').default} className="asia-bg" alt="asia"/>
                </div>
                
                <h3>Asia</h3>
            </React.Fragment>
        )
    }

}