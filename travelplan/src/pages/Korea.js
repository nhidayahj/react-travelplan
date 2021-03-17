import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/korea"

export default class Australia extends React.Component {
    state = {
        kor_reviews: [],
        country: [],
        all_users: [],
        filter_btn: this.props.filter_search,

    }

    async componentDidMount() {
        let response = await axios.get(baseUrl)
        this.setState({
            aus_reviews: response.data[0],
            country: response.data[1],
            all_users: response.data[2]
        })
    }

    renderAllReview() {
        let kor_accum = [];
        for (let user of this.state.all_users) {
            for (let user_review of this.state.aus_reviews) {
                let obj = { review_id: user_review._id, country_id: user_review.country };
                if (user_review.user === user._id) {
                    kor_accum.push(
                        <div key={user_review._id}>
                            <Card>
                                <CardImg top width="25%" height="50%" src={user_review.image_link} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle tag="h5">City: {user_review.city_town}</CardTitle>
                                    <CardTitle tag="h5">Category: {user_review.review_category}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Reviewed by: {user.username}</CardSubtitle>
                                    <CardText>{user_review.review_desc}</CardText>
                                    <Link to={{ pathname: "/edit", state: obj }}><Button outline color="primary" size="sm">Edit</Button></Link>
                                </CardBody>
                            </Card>
                        </div>
                    )
                }
            }
        }
        return kor_accum;
    }

    
    filterBtn = (e) => {
        this.setState({
            filter_btn: e.target.value
        })
    }

    filterDisplay() {
        let filter_accum = [];
        for (let i of this.state.kor_reviews) {
            if (i.review_category === this.state.filter_btn) {
                filter_accum.push(
                    <div key={i._id}>
                        <p>City: {i.city_town}</p>
                        <p>Category: {i.review_category}</p>
                        <p>Review Description: {i.review_desc}</p>
                        <p>Reviewed by: {i.username}</p>
                        <Button outline color="primary" size="sm">Update</Button>{' '}
                        <Button color="danger" size="sm">Delete</Button>
                    </div>
                )
            }
        }
        return filter_accum;
    }

    render() {
        return (
            <React.Fragment>

                <div className="filter-section">
                    <ul>
                        <li class="active" href="/">Home</li>
                        <li href="/">Accommodation</li>
                        <li href="/">Restaurant</li>
                        <li href="/">Activities</li>
                    </ul>
                </div>


                <div>
                    <button name="filter_btn" value="home" onClick={this.filterBtn}>Home</button>
                    <button name="filter_btn" value="Accommodation" onClick={this.filterBtn}>Accommodation</button>
                    <button name="filter_btn" value="Restaurant" onClick={this.filterBtn}>Restaurant</button>
                    <button name="filter_btn" value="Activities" onClick={this.filterBtn}>Travel Activities</button>
                </div>
                <div style={{ display: this.state.filter_btn === "home" || this.state.filter_btn === undefined ? 'block' : 'none' }}>
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