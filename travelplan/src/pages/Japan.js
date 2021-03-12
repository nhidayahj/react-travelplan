import React from 'react'
import axios from 'axios'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/japan"

export default class Japan extends React.Component {
    state = {
        jap_reviews: [],
        country: [],
        filter_btn: ""
    }

    async componentDidMount() {
        let response = await axios.get(baseUrl)
        this.setState({
            jap_reviews: response.data[0],
            country: response.data[1]
        })

    }

    filterDisplay = (e) => {
        this.setState({
            filter_btn: e.target.value
        })
    }

    renderReview() {
        let jap_accum = [];
        for (let i of this.state.jap_reviews) {
            jap_accum.push(
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
        return jap_accum;
    }




    render() {
        return (
            <React.Fragment>
                <h3>Japan</h3>
                <div>
                    <button name="filter_btn" value="accomm" onClick={this.filterDisplay}>Accommodation</button>
                    <button name="filter_btn" value="restaurant" onClick={this.filterDisplay}>Restaurant</button>
                    <button name="filter_btn" value="activities" onClick={this.filterDisplay}>Travel Activities</button>
                </div>
                <div>
                    <h3>Reviews</h3>
                    {this.renderReview()}
                </div>

            </React.Fragment>
        )
    }

}