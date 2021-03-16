import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CreateReview from './CreateReview';

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/";

export default class ShowReview extends React.Component {
    state = {
        edit_review: [],
        all_country: [],
        review_id: this.props.location.state,
        country: "",
        city: "",
        nameOfPlace: '',
        address: "",
        reviewCategory: "",
        reviewType: "",
        reviewDesc: "",
        image: "",
        ratings: "",
        tags: []
    }

    async componentDidMount() {
        let editReview = await axios.get(baseUrl
            + this.state.review_id.review_id + "/update")
        this.setState({
            edit_review: editReview.data,
        })
        for (let i of this.state.edit_review) {
            this.setState({
                city: i.city_town,
                nameOfPlace: i.name_of_place,
                address: i.review_address,
                reviewCategory: i.review_category,
                reviewType: i.review_type,
                reviewDesc: i.review_desc,
                image: i.image_link,
                ratings: i.ratings,
                tags: i.review_tags
            })
        }

    }


    // renderReview = () => {
    //     let accum = [];
    //     for (let review of this.state.all_reviews) {
    //         if (review._id === this.state.review_id) {
    //             accum.push(
    //                 <div key="review._id">
    //                     <h3>{review.review_category}</h3>
    //                     <p>Review Description: {review.review_desc}</p>
    //                     <p>Ratings: {review.ratings}</p>
    //                     <p>Reviewed by: {review.username}</p>

    //                 </div>)
    //         }
    //     }
    //     return accum;
    // }

    updateForm = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    tagList = e => {
        let editList = this.state[e.target.name];
        let updatedList;
        if (!editList.includes(e.target.value)) {
            updatedList = [...editList, e.target.value]
        } else {
            updatedList = editList.filter((element) => {
                return element !== e.target.value
            })
        }
        this.setState({
            tags: updatedList
        })
    }

    submitUpdate = () => {
        
        let updatedObj = {
            cityTown: this.state.city,
            reviewCategory:this.state.reviewCategory,
            reviewType: this.state.review_cat_type,
            nameOfPlace: this.state.nameOfPlace,
            reviewAddress: this.state.address,
            reviewTags: this.state.tags,
            reviewDesc: this.state.reviewDesc,
            imageLink: this.state.image,
            ratings: this.state.ratings,
        }
        let updateNewReview = axios.put(`https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/review/${this.state.edit_review[0]._id}/update`, {updatedObj})

    }

    render() {

        return (
            <React.Fragment>
                <CreateReview />
                <Container className="review-body">
                    <h2 className="page-title">Edit Review</h2>
                    <Form>
                        {this.state.edit_review.map(m => (
                            <React.Fragment>
                                <Row>
                                    <Col sm="4" md="6">
                                        <FormGroup>
                                            <legend>Country</legend>
                                            <Input type="select" name="country" value={this.state.country} onChange={this.updateForm}>
                                                <option value="Australia">Australia</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Korea">Korea</option>
                                                <option value="Taiwan">Taiwan</option>
                                                <option value="Thailand">Thailand</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4" md="6">
                                        <FormGroup>
                                            <legend>City / Town</legend>
                                            <Input type="text" name="city" value={this.state.city} onChange={this.updateForm} placeholder="City" />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </React.Fragment>
                        ))}
                        <Row>
                            <Col>
                                <FormGroup>
                                    <legend>Review Category</legend>
                                    <Input type="select" name="reviewCategory" value={this.state.reviewCategory} onChange={this.updateForm}>
                                        <option value="Accommodation">Accommodation</option>
                                        <option value="Restaurant">Restaurant</option>
                                        <option value="Activities">Activities</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div style={{ display: this.state.reviewCategory === "Accommodation" ? "block" : 'none' }}>
                            <FormGroup tag="fieldset">
                                <legend>Accommodation Type</legend>
                                <FormGroup check>
                                    <Input type="radio" id="radio1-option1" name="reviewType"
                                        value="hotel" onChange={this.updateForm} checked={this.state.reviewType === "hotel"} />
                                    <Label>Hotel</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input type="radio" name="reviewType" id="radio1-option2"
                                        value="airbnb" onChange={this.updateForm} checked={this.state.reviewType === "airbnb"} />
                                    <Label>Airbnb</Label>

                                </FormGroup>
                                <FormGroup check>
                                    <Input type="radio" name="reviewType"
                                        value="hostel" onChange={this.updateForm} checked={this.state.reviewType === "hostel"} />
                                    <Label>Hostel</Label>
                                </FormGroup>
                            </FormGroup>
                            <Row>
                                <Col>
                                    <legend>Accommodation Details</legend>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4" md="6">
                                    <FormGroup>
                                        <Label>Name of Building</Label>
                                        <Input type="text" name="nameOfPlace"
                                            value={this.state.nameOfPlace} onChange={this.updateForm} />
                                    </FormGroup>
                                </Col>
                                <Col sm="4" md="6">
                                    <FormGroup>
                                        <Label>Location</Label>
                                        <Input type="text" name="address"
                                            value={this.state.address} onChange={this.updateForm} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <legend>Accommodation Facilities</legend>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <FormGroup check inline>
                                        <Input type="checkbox" name="tags" value="room-service" onChange={this.tagList}
                                            checked={this.state.tags.includes("room-service")} />
                                        <Label check>Room Service</Label>
                                    </FormGroup>
                                </Col>
                                <Col sm="4">
                                    <FormGroup check inline>
                                        <Input type="checkbox" name="tags" value="wifi" onChange={this.tagList}
                                            checked={this.state.tags.includes("wifi")} />
                                        <Label check>Free Wifi</Label>
                                    </FormGroup>
                                </Col>
                                <Col sm="4">
                                    <FormGroup check inline>
                                        <Input type="checkbox" name="tags" value="breakfast" onChange={this.tagList}
                                            checked={this.state.tags.includes("breakfast")} />
                                        <Label check>All-Day Breakfast</Label>
                                    </FormGroup>
                                </Col>
                                <Col sm="4">
                                    <FormGroup check inline>
                                        <Input type="checkbox" name="tags" value="deals" onChange={this.tagList}
                                            checked={this.state.tags.includes("deals")} />
                                        <Label check>Accommodation Deals</Label>
                                    </FormGroup>
                                </Col>
                                <Col sm="4">
                                    <FormGroup check inline>
                                        <Input type="checkbox" name="tags" value="gym" onChange={this.tagList}
                                            checked={this.state.tags.includes("gym")} />
                                        <Label check>Gym Center</Label>
                                    </FormGroup>
                                </Col>
                                <Col sm="4">
                                    <FormGroup check inline>
                                        <Input type="checkbox" name="tags" value="non-smoking-rooms" onChange={this.tagList}
                                            checked={this.state.tags.includes("non-smoking-rooms")} />
                                        <Label check>Non-Smoking Rooms</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <legend>Review Description</legend>
                                        <Input type="textarea" name="reviewDesc" value={this.state.reviewDesc} onChange={this.updateForm} />
                                    </FormGroup>
                                </Col>
                                <Col md="6">

                                    <FormGroup tag="fieldset">
                                        <legend>Ratings</legend>
                                        <FormGroup check>
                                            <Input type="radio" name="ratings"
                                                value="poor" onChange={this.updateForm} checked={this.state.ratings === "poor"} />
                                            <Label>Poor</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Input type="radio" name="ratings"
                                                value="satisfactory" onChange={this.updateForm} checked={this.state.ratings === "satisfactory"} />
                                            <Label>Satisfactory</Label>

                                        </FormGroup>
                                        <FormGroup check>
                                            <Input type="radio" name="ratings"
                                                value="excellent" onChange={this.updateForm} checked={this.state.ratings === "excellent"} />
                                            <Label>Excellent</Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <legend>Image Url</legend>
                                        <Input
                                            type="url"
                                            name="image"
                                            value={this.state.image}
                                            onChange={this.updateForm}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                
                            <div className="review-form-btns">
                                <Button id="update" color="info" onClick={this.submitUpdate}>Update</Button>{' '}
                                <Button color="danger">Delete</Button>
                            </div>
                        </div>
                        {/* End of Accommodation */}
                    </Form>
                </Container>

            </React.Fragment >
        )
    }
}