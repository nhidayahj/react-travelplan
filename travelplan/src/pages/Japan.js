import React from 'react';
import axios from 'axios';
import {
    Container, Input, InputGroup, InputGroupAddon,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/japan"

export default class Japan extends React.Component {
    state = {
        jap_reviews: [],
        country: [],
        all_users: [],
        jap_users: [],
        filter_btn: "",


    }

    async componentDidMount() {
        let response = await axios.get(baseUrl)
        this.setState({
            jap_reviews: response.data[0],
            country: response.data[1],
            all_users: response.data[2]
        })
        let jap_user = [];
        for (let user of this.state.all_users) {
            for (let review of this.state.jap_reviews) {
                if (user._id === review.user) {
                    jap_user.push(user)
                }
            }
        }
        this.setState({
            jap_users: jap_user
        })
    }

    filterBtn = (e) => {
        this.setState({
            filter_btn: e.target.value
        })
    }

    filterDisplayTitle() {
        if (this.state.filter_btn === "Accommodation") {
            return (<h3 className="page-title-display">amazing places to relax in</h3>)
        } else if (this.state.filter_btn === "Restaurant") {
            return (<h3 className="page-title-display">spice up your tastebuds</h3>)
        } else if (this.state.filter_btn === "Activities") {
            return (<h3 className="page-title-display">travel activities to hype your adventure</h3>)
        }
    }

    filterDisplay() {
        let filter_accum = [];
        let heading;
        for (let i of this.state.jap_reviews) {
            if (i.review_category === this.state.filter_btn) {
                heading = this.filterDisplayTitle()
                filter_accum.push(
                    <div key={i._id} className="filter-result">
                        <div className="filter-img">
                            <img src={i.image_link} className="filter-img-link" alt="uploaded img"></img>
                        </div>
                        <div className="filter-info">
                            <h3 className="info-title">{i.review_type}</h3>
                            <div className="info">
                                <p>Description: {i.review_desc}</p>
                                <p>Reviewed by: user</p>
                            </div>
                            <div className="info-btns">
                                <div><Button outline color="info" size="sm">edit</Button></div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return { heading, filter_accum };
    }


    renderAllReview() {
        let jap_accum = [];
        for (let user of this.state.jap_users) {
            for (let user_review of this.state.jap_reviews) {
                if (user._id === user_review.user) {
                    let obj = { review_id: user_review._id, country_id: user_review.country };
                    jap_accum.push(
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
        return jap_accum;
    }


    render() {
        return (
            <React.Fragment>
                <Container>
                    <div className="filter-section">
                        <button value="home" className="filter-btn" onClick={this.filterBtn}>Home</button>
                        <button value="Accommodation" className="filter-btn" onClick={this.filterBtn}>Accommodation</button>
                        <button value="Restaurant" className="filter-btn" onClick={this.filterBtn}>Restaurant</button>
                        <button value="Activities" className="filter-btn" onClick={this.filterBtn}>Activities</button>
                    </div>

                    <div>
                        <h3 className="page-title">travellers reviews</h3>
                    </div>
                    <div className="page-search">
                        <InputGroup>
                            <Input placeholder="search by city, keywords, username .." />
                            <InputGroupAddon addonType="append">
                                <Button outline color="info">Search</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    <div style={{ display: this.state.filter_btn === "home" || this.state.filter_btn === "" ? 'block' : 'none' }}>
                        {this.renderAllReview()}
                    </div>
                    <div style={{
                        display: this.state.filter_btn === "Accommodation" || this.state.filter_btn === "Restaurant"
                            || this.state.filter_btn === "Activities"
                            ? 'block' : 'none'
                    }}>
                        {this.filterDisplay().heading}
                        {this.filterDisplay().filter_accum}

                    </div>

                </Container>

            </React.Fragment>
        )
    }

}