import React from 'react'
import axios from 'axios'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/australia"

export default class Australia extends React.Component {
    state = {
        aus_reviews: [],
        country: [],
        accomm: []
    }

    async componentDidMount() {
        let response = await axios.get(baseUrl)
        this.setState({
            aus_reviews: response.data[0],
            country: response.data[1]
        })
    }

    renderReview() {
        let aus_accum = [];
        for (let i of this.state.aus_reviews) {
            aus_accum.push(
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
        return aus_accum;
    }


    render() {
        return (
            <React.Fragment>
                <h3>Australia</h3>
                <div>
                    <button>Accommodation</button>
                    <button>Restaurant</button>
                    <button>Travel Activities</button>
                </div>
                <div>
                    <h3>Reviews</h3>
                    {this.renderReview()}
                </div>
            </React.Fragment>
        )
    }

}