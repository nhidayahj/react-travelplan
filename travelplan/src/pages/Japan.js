import React from 'react';
import axios from 'axios';
import {
    Container, Row, Col, Input, InputGroup,
    Button, Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';

const baseUrl = "https://nhj-travelplan-project-tgc11.herokuapp.com/japan"

export default class Japan extends React.Component {
    state = {
        all_reviews: [],
        country: [],
        users: [],
        country_users: [],
        queryCity: "",
        queryTags: "",
        filter_btn: "",
        search_flag: false,
        newResult: ""
    }

    async componentDidMount() {
        let response = await axios.get(baseUrl + "/all")
        this.setState({
            all_reviews: response.data[0],
            country: response.data[1],
            all_users: response.data[2]
        })
        let all_users = [];
        for (let user of this.state.all_users) {
            for (let review of this.state.all_reviews) {
                if (user._id === review.user) {
                    all_users.push(user)
                }
            }
        }
        this.setState({
            country_users: all_users
        })
    }

    userReview(userId) {
        for (let user of this.state.country_users) {
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

    reviewType(review_type) {
        return (<Badge pill className="pill-type">{review_type}</Badge>)
    }

    reviewCat(category) {
        if (category === "Accommodation") {
            return (<Badge pill className="pill-accom">{category}</Badge>)
        } else if (category === "Restaurant") {
            return (<Badge pill className="pill-rest">{category}</Badge>)
        } else if (category === "Activities") {
            return (<Badge pill className="pill-act">{category}</Badge>)
        }
    }

    renderAllReview() {
        let all_accum = [];
        for (let i of this.state.all_reviews) {
            let obj = { review_id: i._id, country_id: i.country };
            all_accum.push(
                <div key={i._id} className="filter-result">
                    <div className="filter-img">
                        <img src={i.image_link} className="filter-img-link" alt="uploaded img"></img>
                    </div>
                    <div className="filter-info">
                        <div className="info-title">
                            <h5>Name: {i.name_of_place}</h5>
                            <h5>Address: {i.review_address}</h5>
                        </div>
                        <div className="info-sub-title">
                            <h6>Location: Japan, {i.city_town} </h6>
                            <h6>Category: {this.reviewCat(i.review_category)}</h6>
                            <h6>Review Type: {this.reviewType(i.review_type)}</h6>
                            <h6>Tags: <span>{this.reviewTags(i.review_tags)}</span></h6>
                        </div>
                        <div className="info">
                            <div className="review-desc"><p>"{i.review_desc}"</p></div>
                        </div>
                        <div className="reviewed-by"><p>Reviewed by: {this.userReview(i.user)}</p></div>
                        <div className="info-btns">
                            <div><Link to={{ pathname: "/edit", state: obj }}>
                                <Button outline color="primary" size="sm" className="info-edit-btns">Edit</Button></Link></div>
                        </div>
                    </div>
                </div>)
        }
        return all_accum;
    }

    filterBtn = (e) => {
        this.setState({
            filter_btn: e.target.value,
            search_flag: false
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
        for (let i of this.state.all_reviews) {
            if (i.review_category === this.state.filter_btn) {
                let obj = { review_id: i._id, country_id: i.country };
                heading = this.filterDisplayTitle()
                filter_accum.push(
                    <div key={i._id} className="filter-result">
                        <div className="filter-img">
                            <img src={i.image_link} className="filter-img-link" alt="uploaded img"></img>
                        </div>
                        <div className="filter-info">
                            <div className="info-title">
                                <h5>Name: {i.name_of_place}</h5>
                                <h5>Address: {i.review_address}</h5>
                            </div>
                            <div className="info-sub-title">
                                <h6>Location: Japan, {i.city_town} </h6>
                                <h6>Category: {this.reviewCat(i.review_category)}</h6>
                                <h6>Review Type: {this.reviewType(i.review_type)}</h6>
                                <h6>Tags: <span>{this.reviewTags(i.review_tags)}</span></h6>
                            </div>
                            <div className="info">
                                <div className="review-desc"><p>"{i.review_desc}"</p></div>
                            </div>
                            <div className="reviewed-by"><p>Reviewed by: {this.userReview(i.user)}</p></div>
                            <div className="info-btns">
                                <div><Link to={{ pathname: "/edit", state: obj }}>
                                    <Button outline color="primary" size="sm" className="info-edit-btns">Edit</Button></Link></div>
                            </div>
                        </div>
                    </div>)
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
        this.setState({
            search_flag: true,
        })

    }

    renderUserSearch = () => {
        let search_accum = [];
        if (this.state.newResult.length > 0) {
            let noOfSearch = this.state.newResult.length;
            let title = <h3 className="page-title-display">{noOfSearch} Search Result(s)</h3>
            for (let i of this.state.newResult) {
                let obj = { review_id: i._id, country_id: i.country };
                // heading = this.filterDisplayTitle()
                search_accum.push(
                    <div key={i._id} className="filter-result">
                        <div className="filter-img">
                            <img src={i.image_link} className="filter-img-link" alt="uploaded img"></img>
                        </div>
                        <div className="filter-info">
                            <div className="info-title">
                                <h5>Name: {i.name_of_place}</h5>
                                <h5>Address: {i.review_address}</h5>
                            </div>
                            <div className="info-sub-title">
                                <h6>Location: Japan, {i.city_town} </h6>
                                <h6>Category: {this.reviewCat(i.review_category)}</h6>
                                <h6>Review Type: {this.reviewType(i.review_type)}</h6>
                                <h6>Tags: <span>{this.reviewTags(i.review_tags)}</span></h6>
                            </div>
                            <div className="info">
                                <div className="review-desc"><p>"{i.review_desc}"</p></div>
                            </div>
                            <div className="reviewed-by"><p>Reviewed by: {this.userReview(i.user)}</p></div>
                            <div className="info-btns">
                                <div><Link to={{ pathname: "/edit", state: obj }}>
                                    <Button outline color="primary" size="sm" className="info-edit-btns">Edit</Button></Link></div>
                            </div>
                        </div>
                    </div>)
            }
            return {title,search_accum};
        } else {
            let noOfSearch = this.state.newResult.length
            let title = <h3 className="page-title-display">{noOfSearch} Search Result(s)</h3>
            return { title }
        }

    }




    render() {
        return (
            <React.Fragment>
                <div className="page-img-header">
                    <div className="country-img-jap"></div>
                </div>
                <Container>
                    <div className="filter-section">
                        <button value="Home" className="filter-btn" onClick={this.filterBtn}>Home</button>
                        <button value="Accommodation" className="filter-btn" onClick={this.filterBtn}>Accommodation</button>
                        <button value="Restaurant" className="filter-btn" onClick={this.filterBtn}>Restaurant</button>
                        <button value="Activities" className="filter-btn" onClick={this.filterBtn}>Activities</button>
                    </div>

                    <div>
                        <hr className="divider"></hr>
                        <h3 className="page-title">Discover Japan</h3>
                        <hr className="divider"></hr>
                    </div>
                    <div className="page-search">
                        <h4 className="page-title-display">Filter Search </h4>
                        <Row>
                            <Col md="6" sm="4">
                                <InputGroup className="search-field">
                                    <Input placeholder="search by city .."
                                        name="queryCity" value={this.state.queryBox} onChange={this.querySearch} />
                                </InputGroup></Col>
                            <Col md="6" sm="4">
                                <InputGroup className="search-field">
                                    <Input placeholder="search by keywords, tags .."
                                        name="queryTags" value={this.state.queryBox} onChange={this.querySearch} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <div>
                            <Button color="info" className="page-search-btn" onClick={this.userSearch}>Search</Button>
                        </div>
                    </div>

                    <div style={{
                        display: (this.state.filter_btn === "Home" || this.state.filter_btn === "")
                            && this.state.search_flag === false ? 'block' : 'none'
                    }}
                        className="all-reviews">
                        <h3 className="page-title-display">Our Reviews</h3>
                        {this.renderAllReview()}
                    </div>
                    <div style={{
                        display: (this.state.filter_btn === "Accommodation" || this.state.filter_btn === "Restaurant"
                            || this.state.filter_btn === "Activities") && this.state.search_flag === false
                            ? 'block' : 'none'
                    }}>
                        {this.filterDisplay().heading}
                        {this.filterDisplay().filter_accum}

                    </div>
                    <div style={{ display: this.state.search_flag === true ? "block" : "none" }}>
   
                        {this.renderUserSearch().title}
                        {this.renderUserSearch().search_accum}
                    </div>

                </Container>

            </React.Fragment>
        )
    }

}