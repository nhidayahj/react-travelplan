import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';


const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/australia"

export default class Australia extends React.Component {
    state = {
        aus_reviews: [],
        country: [],
        filter_btn: "",

    }

    async componentDidMount() {
        let response = await axios.get(baseUrl)
        this.setState({
            aus_reviews: response.data[0],
            country: response.data[1]
        })
    }

    renderAllReview() {
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

    filterBtn = (e) => {
        this.setState({
            filter_btn: e.target.value
        })

    }

    filterDisplay() {
        let filter_accum = [];
        for (let i of this.state.aus_reviews) {
            if (i.review_category === this.state.filter_btn) {
                filter_accum.push(
                    <div key={i._id}>
                        <p>City: {i.city_town}</p>
                        <p>Category: {i.review_category}</p>
                        <p>Review Description: {i.review_desc}</p>
                        <p>Reviewed by: {i.username}</p>
                        <Button outline color="primary">Update</Button>{' '}
                        <Button>Delete</Button>
                    </div>
                )
            }
        }
        return filter_accum;

    }

    render() {
        return (
            <React.Fragment>
                <h3>Australia</h3>
                <div>
                    <button name="filter_btn" value="home" onClick={this.filterBtn}>Home</button>
                    <button name="filter_btn" value="Accommodation" onClick={this.filterBtn}>Accommodation</button>
                    <button name="filter_btn" value="Restaurant" onClick={this.filterBtn}>Restaurant</button>
                    <button name="filter_btn" value="activities" onClick={this.filterBtn}>Travel Activities</button>
                </div>
                <div style={{ display: this.state.filter_btn === "home" || this.state.filter_btn === "" ? 'block' : 'none' }}>
                    <h3>Reviews</h3>
                    {this.renderAllReview()}
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