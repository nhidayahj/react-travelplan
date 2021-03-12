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

    filterBtn = (e) => {
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

    filterDisplay() {
        let filter_accum = [];
        for (let i of this.state.jap_reviews) {
            if (i.review_category === this.state.filter_btn) {
                filter_accum.push(
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
        }
        return filter_accum;
    }

    render() {
        return (
            <React.Fragment>
                <h3>Japan</h3>
                <div>
                    <button name="filter_btn" value="home" onClick={this.filterBtn}>Home</button>
                    <button name="filter_btn" value="Accommodation" onClick={this.filterBtn}>Accommodation</button>
                    <button name="filter_btn" value="Restaurant" onClick={this.filterBtn}>Restaurant</button>
                    <button name="filter_btn" value="Activities" onClick={this.filterBtn}>Travel Activities</button>
                </div>
                <div style={{display: this.state.filter_btn === "home" || this.state.filter_btn === "" ? 'block' : 'none'}}>
                    <h3>Reviews</h3>
                    {this.renderReview()}
                </div>
                <div style={{
                    display: this.state.filter_btn === "Accommodation" || this.state.filter_btn === "Restaurant"
                        || this.state.filter_btn === "Activities"
                        ? 'block' : 'none'
                }}>
                    {this.filterDisplay()}

                </div>

            </React.Fragment>
        )
    }

}