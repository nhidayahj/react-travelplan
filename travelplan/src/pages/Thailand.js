import React from 'react'
import axios from 'axios'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/thailand"

export default class Thailand extends React.Component {
    state = {
        all_reviews:[],
        country:[]
    }

    async componentDidMount() {
        let response = await axios.get(baseUrl)
        this.setState({
            all_reviews:response.data[0],
            country:response.data[1]
        })
    }

    renderReview() {
        let thai_accum = [];
        for (let i of this.state.all_reviews) {
            thai_accum.push(
                <div key={i._id}>
                    <p>City: {i.city_town}</p>
                    <p>Category: {i.review_category}</p>
                    <p>Review Description: {i.review_desc}</p>
                    <p>Reviewed by: {i.username}</p>
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            )
        }
        return thai_accum;
    }

    render() {
        return (
            <React.Fragment>
                <h3>Thailand</h3>
                <div>
                    <button>Accommodation</button>
                    <button>Restaurant</button>
                    <button>Travel Activities</button>
                </div>
                <div>
                    {this.renderReview()}
                </div>
            </React.Fragment>
        )
    }

}