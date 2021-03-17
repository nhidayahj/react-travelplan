import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Input, InputGroup, InputGroupAddon,
    Container,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/australia"

export default class Australia extends React.Component {
    state = {
        aus_reviews: [],
        country: [],
        all_users: [],
        filter_btn: "",
    }

    async componentDidMount() {
        let response = await axios.get(baseUrl)
        this.setState({
            aus_reviews: response.data[0],
            country: response.data[1],
            all_users: response.data[2]
        })
    }

    renderCountryInfo() {
        // for (let info of this.state.country) {
        //     return (
        //         <div>
        //             <h3 className="country-name">Australia</h3>
        //             <div id="page-img-aus">
        //                 <Container>
        //                     <div className="country-info">
        //                         <p>{info.description}</p>
        //                     </div>
        //                 </Container>
        //             </div>


        //         </div>
        //     )
        // }
        return (
            <div>
                <h3 className="country-name">Australia</h3>
                <div id="page-img-aus">hello
                    {/* <Container>
                        <div className="country-info">
                            
                        </div>
                    </Container> */}
                </div>
            </div>
        )

    }


    renderAllReview() {
        let aus_accum = [];
        for (let user of this.state.all_users) {
            for (let user_review of this.state.aus_reviews) {
                let obj = { review_id: user_review._id, country_id: user_review.country };
                if (user_review.user === user._id) {
                    aus_accum.push(
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
        return aus_accum;
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
        for (let i of this.state.aus_reviews) {
            if (i.review_category === this.state.filter_btn) {
                heading = this.filterDisplayTitle()
                filter_accum.push(
                    <div key={i._id} className="filter-result">
                        <div className="filter-img">
                            <img src={i.image_link} className="filter-img-link"></img>
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

                    // <div key={i._id}>
                    //     <p>City: {i.city_town}</p>
                    //     <p>Category: {i.review_category}</p>
                    //     <p>Review Description: {i.review_desc}</p>
                    //     <p>Reviewed by: {i.username}</p>
                    //     <Button outline color="primary" size="sm">Update</Button>{' '}
                    //     <Button color="danger" size="sm">Delete</Button>
                    // </div>
                )
            }
        }
        return { heading, filter_accum };
    }

    render() {
        return (
            <React.Fragment>

                {this.renderCountryInfo()}
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