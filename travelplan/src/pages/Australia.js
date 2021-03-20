import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Input, InputGroup,
    Container, Row, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/australia";



export default class Australia extends React.Component {
    state = {
        aus_reviews: [],
        country: [],
        all_users: [],
        aus_users: [],
        queryCity: "",
        queryTags: [],
        filter_btn: "",
        newResult: ""
    }

    async componentDidMount() {
        let response = await axios.get(baseUrl + "/all")
        this.setState({
            aus_reviews: response.data[0],
            country: response.data[1],
            all_users: response.data[2]
        })
        let aus_user = [];
        for (let user of this.state.all_users) {
            for (let review of this.state.aus_reviews) {
                if (user._id === review.user) {
                    aus_user.push(user)
                }
            }
        }
        this.setState({
            aus_users: aus_user
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

    userReview(userId) {
        for (let user of this.state.aus_users) {
            if (user._id === userId) {
                return user.username
            }
        }
    }

    reviewTags(tags) {
        let tag_pill = [];
        for (let tag of tags) {
            tag_pill.push(
                <Badge pill className="pill-tags">{tag}</Badge>
            )
        }
        return tag_pill;
    }

    reviewType(review_type){
       return (<Badge pill className="pill-type">{review_type}</Badge>)
    }


    renderAllReview() {
        let aus_accum = [];

        for (let user_review of this.state.aus_reviews) {
            let obj = { review_id: user_review._id, country_id: user_review.country };
            aus_accum.push(
                <div key={user_review._id}>
                    <Card className="card-all-reviews">
                        <CardImg top width="25%" height="50%" src={user_review.image_link} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">City: {user_review.city_town}</CardTitle>
                            <CardTitle tag="h5">Category: {user_review.review_category}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Reviewed by: {this.userReview(user_review.user)}</CardSubtitle>
                            <CardText>{user_review.review_desc}</CardText>
                            <Link to={{ pathname: "/edit", state: obj }}><Button outline color="primary" size="sm">Edit</Button></Link>
                        </CardBody>
                    </Card>
                </div>)
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
                let obj = { review_id: i._id, country_id: i.country };
                heading = this.filterDisplayTitle()
                filter_accum.push(
                    <div key={i._id} className="filter-result">
                        <div className="filter-img">
                            <img src={i.image_link} className="filter-img-link" alt="uploaded img"></img>
                        </div>
                        <div className="filter-info">
                            <h4 className="info-title" style={{fontWeight:"bold"}}>Australia, {i.city_town}</h4>
                            <h6 className="info-title" style={{fontWeight:"bold"}}>Review Type: {this.reviewType(i.review_type)}</h6>
                            <div className="info">
                            <p style={{fontWeight:"bold"}}>tags: <span>{this.reviewTags(i.review_tags)}</span></p> 
                                <p>Description: {i.review_desc}</p>
                                <p>Reviewed by: {this.userReview(i.user)}</p>
                            </div>
                            <div className="info-btns">
                                <div><Link to={{ pathname: "/edit", state: obj }}>
                                    <Button outline color="primary" size="sm" className="info-edit-btns">Edit</Button></Link></div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return { heading, filter_accum };
    }

    querySearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    userSearch = async () => {
        let searchQuery;
        if (this.state.queryCity && this.state.queryTags !== "") {
            searchQuery = await axios.post(baseUrl, {
                queryCity: this.state.queryCity,
                queryTags: this.state.queryTags
            })
            this.setState({
                newResult: searchQuery.data
            })
            console.log("Search by City & Tags: ", searchQuery.data)
        } else if (this.state.queryCity) {
            searchQuery = await axios.post(baseUrl, {
                queryCity: this.state.queryCity
            })
            this.setState({
                newResult: searchQuery.data
            })
            console.log("Search by city: ", searchQuery.data)
        } else if (this.state.queryTags) {
            searchQuery = await axios.post(baseUrl, {
                queryTags: this.state.queryTags
            })
            this.setState({
                newResult: searchQuery.data
            })
            console.log("Search by tags: ", searchQuery.data)
        }
    }

    renderUserSearch = () => {
        let search_accum = [];
        for (let i of this.state.newResult) {
            search_accum.push(
                <div key={i._id} className="filter-result">
                    <div className="filter-img">
                        <img src={i.image_link} className="filter-img-link" alt="uploaded img"></img>
                    </div>
                    <div className="filter-info">
                        <h3 className="info-title">City: {i.city_town}</h3>
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
        return search_accum;
    }

    render() {
        return (
            <React.Fragment>

                {this.renderCountryInfo()}
                <Container>
                    <div className="filter-section">
                        <button value="Home" className="filter-btn" onClick={this.filterBtn}>Home</button>
                        <button value="Accommodation" className="filter-btn" onClick={this.filterBtn}>Accommodation</button>
                        <button value="Restaurant" className="filter-btn" onClick={this.filterBtn}>Restaurant</button>
                        <button value="Activities" className="filter-btn" onClick={this.filterBtn}>Activities</button>
                    </div>

                    <div>
                        <hr className="divider"></hr>
                        <h3 className="page-title">Discover Australia</h3>
                        <hr className="divider"></hr>
                    </div>
                    <div className="page-search">
                        <h4 className="page-title-display">Filter Search </h4>
                        <Row>
                            <Col md="4" sm="4">
                                <InputGroup>
                                    <Input placeholder="search by city .."
                                        name="queryCity" value={this.state.queryBox} onChange={this.querySearch} />
                                </InputGroup></Col>
                            <Col md="4" sm="4">
                                <InputGroup>
                                    <Input placeholder="search by keywords, tags .."
                                        name="queryTags" value={this.state.queryBox} onChange={this.querySearch} />
                                </InputGroup>
                            </Col>
                            <Col md="4" sm="4">
                                <InputGroup>
                                    <Input placeholder="search by reviewer .."
                                        name="queryReviewer" value={this.state.queryBox} onChange={this.querySearch} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <div>
                            <Button color="info" className="page-search-btn" onClick={this.userSearch}>Search</Button>
                        </div>
                    </div>

                    <div style={{
                        display: (this.state.filter_btn === "Home" || this.state.filter_btn === "")
                            && this.state.newResult === "" ? 'block' : 'none'
                    }}
                        className="all-reviews">
                        <h3 className="page-title-display">Our Reviews</h3>
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
                    <div style={{ display: this.state.newResult !== "" ? "block" : "none" }}>
                        <h3 className="page-title-display">Filtered Search</h3>
                        {this.renderUserSearch()}
                    </div>

                </Container>


            </React.Fragment>
        )
    }

}