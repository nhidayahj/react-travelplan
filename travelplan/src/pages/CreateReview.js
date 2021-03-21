import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io"

export default class CreateReview extends React.Component {
    state = {
        username: "",
        usercode: Math.floor(Math.random() * 9999 + 10000),
        city: "",
        country: "",
        reviewType: '',
        nameOfPlace: '',
        address: "",
        reviewCategory: "",
        reviewDesc: "",
        image: "",
        ratings: "",
        tags: []
    }

    userFill = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    displayActivities() {
        if (this.state.reviewCategory === "Accommodation") {
            return "Accommodation"
        } else if (this.state.reviewCategory === "Restaurant") {
            return "Restaurant"
        } else if (this.state.reviewCategory === "Activities") {
            return "Activities"
        }
    }

    tagList = (e) => {
        let currentActivities = this.state[e.target.name];

        let modifiedActivities;

        if (!currentActivities.includes(e.target.value)) {
            modifiedActivities = [...currentActivities, e.target.value]
        } else {
            modifiedActivities = currentActivities.filter((element) => {
                return element !== e.target.value
            })
        }

        this.setState({
            tags: modifiedActivities
        })
    }

    templateFields() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <FormGroup>
                            <legend>Review Description</legend>
                            <Input type="textarea" name="reviewDesc" value={this.state.reviewDesc} onChange={this.userFill} maxLength={300} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup tag="fieldset">
                            <legend>Ratings</legend>
                            <FormGroup check>
                                <Input type="radio" name="ratings"
                                    value="poor" onChange={this.userFill} checked={this.state.ratings === "poor"} />
                                <Label>Poor</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input type="radio" name="ratings"
                                    value="satisfactory" onChange={this.userFill} checked={this.state.ratings === "satisfactory"} />
                                <Label>Satisfactory</Label>

                            </FormGroup>
                            <FormGroup check>
                                <Input type="radio" name="ratings"
                                    value="excellent" onChange={this.userFill} checked={this.state.ratings === "excellent"} />
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
                                onChange={this.userFill}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <div className="review-form-btns">
                    <Button className="update" color="info" onClick={this.submitReview}>Submit</Button>{' '}
                    {/* <Button color="danger" onClick={this.deletePost}>Cancel</Button> */}
                </div>
            </React.Fragment>
        )
    }


    submitReview = async () => {
        let all_review = await axios.post(baseUrl + '/createreviews', {
            user: this.state.username,
            username: this.state.username,
            usercode: this.state.usercode,
            countryName: this.state.country.toLowerCase(),
            cityTown: this.state.city,
            reviewCategory: this.state.reviewCategory,
            reviewType: this.state.reviewType,
            nameOfPlace: this.state.nameOfPlace,
            reviewAddress: this.state.address,
            reviewTags: this.state.tags,
            reviewDesc: this.state.reviewDesc,
            imageLink: this.state.image,
            ratings: this.state.ratings,

        })
        console.log(all_review.data)
        console.log("review id: ", all_review.data._id)
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <h2 className="page-title">Create a Review</h2>
                    <Form>
                        <Row>
                            <Col sm="4" md="6">
                                <FormGroup>
                                    <legend>Country</legend>
                                    <Input type="select" name="country" value={this.state.country} onChange={this.userFill}>
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
                                    <Input type="text" name="city" value={this.state.city} onChange={this.userFill} placeholder="City" />
                                </FormGroup>
                            </Col>
                        </Row>


                        {/* Experience List */}
                        <Row>
                            <Col>
                                <FormGroup>
                                    <legend>Review Category</legend>
                                    <Input type="select" name="reviewCategory" value={this.state.reviewCategory} onChange={this.userFill}>
                                        <option value="select" disabled>Select Category</option>
                                        <option value="Accommodation">Accommodation</option>
                                        <option value="Restaurant">Restaurant</option>
                                        <option value="Activities">Activities</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* Acccommodation Details */}
                        <div style={{ display: this.displayActivities() === "Accommodation" ? 'block' : 'none' }}>


                            <FormGroup tag="fieldset">
                                <legend>Accommodation Type</legend>
                                <FormGroup check>
                                    <Input type="radio" name="reviewType"
                                        value="hotel" onChange={this.userFill} checked={this.state.reviewType === "hotel"} />
                                    <Label>Hotel</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input type="radio" name="reviewType"
                                        value="airbnb" onChange={this.userFill} checked={this.state.reviewType === "airbnb"} />
                                    <Label>Airbnb</Label>

                                </FormGroup>
                                <FormGroup check>
                                    <Input type="radio" name="reviewType"
                                        value="hostel" onChange={this.userFill} checked={this.state.reviewType === "hostel"} />
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
                                            value={this.state.nameOfPlace} onChange={this.userFill} />
                                    </FormGroup>
                                </Col>
                                <Col sm="4" md="6">
                                    <FormGroup>
                                        <Label>Address</Label>
                                        <Input type="text" name="address"
                                            value={this.state.address} onChange={this.userFill} />
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
                        {this.templateFields()}
                        </div>
                    {/* End of Accommodation */}

                    <div style={{ display: this.displayActivities() === "Restaurant" ? 'block' : 'none' }}>

                        {/* Restaurant Details */}
                        <div>
                            <h4>Restaurant Details</h4>
                            <label>Name of Restaurant</label>
                            <input type="text" name="nameOfPlace" value={this.state.nameOfPlace} onChange={this.userFill} />
                            <label>Restaurant Address</label>
                            <input type="text" name="address" value={this.state.address} onChange={this.userFill} />
                        </div>


                        {/* Restaurant Type */}
                        <div>
                            <h4>Type of Restaurant</h4>
                            <input type="radio" name="review_cat_type" value="fine-dining" onChange={this.userFill} /> Fine Dining
                        <input type="radio" name="review_cat_type" value="casual-dining" onChange={this.userFill} /> Casual Dining
                        <input type="radio" name="review_cat_type" value="street-food" onChange={this.userFill} /> Street Food
                    </div>

                        {/* Restaurant Tags  */}
                        <div>
                            <h4>Service</h4>
                            <input type="checkbox"
                                name="tags"
                                value="dine-in"
                                onChange={this.tagList}
                                checked={this.state.tags.includes("dine-in")} />Dine-in

                    <input type="checkbox"
                                name="tags"
                                value="takeaway"
                                onChange={this.tagList}
                                checked={this.state.tags.includes("takeaway")} />Takeaway

                    <input type="checkbox"
                                name="tags"
                                value="drive-thru"
                                onChange={this.tagList}
                                checked={this.state.tags.includes("drive-thru")} />Drive Thru
                    </div>
                        {/* Restaurant Service */}

                        <div>
                            <h4>Menu type</h4>
                            <input type="checkbox"
                                name="tags"
                                value="local"
                                onChange={this.tagList}
                                checked={this.state.tags.includes("local")} />Local
                        <input type="checkbox"
                                name="tags"
                                value="fusion"
                                onChange={this.tagList}
                                checked={this.state.tags.includes("fusion")} />Fusion
                        <input type="checkbox"
                                name="tags"
                                value="western"
                                onChange={this.tagList}
                                checked={this.state.tags.includes("western")} />Western
                        </div>
                        {/* Restaurant Cuisines */}
                        {this.templateFields()}
                    </div>
                    {/* End of restaurant */}

                    <div style={{ display: this.displayActivities() === 'Activities' ? 'block' : 'none' }}>
                        {/* type of activities */}
                        <div>
                            <h4>Type of Travel Activities</h4>
                            <input type="radio" name="review_cat_type" value="outdoor" onChange={this.userFill} />Outdoor Adventure
                        <input type="radio" name="review_cat_type" value="cultural" onChange={this.userFill} />Cultural Workshops
                        <input type="radio" name="review_cat_type" value="arts" onChange={this.userFill} />Arts & Crafts
                    </div>

                        <div style={{ display: this.state.review_cat_type === "outdoor" ? "block" : 'none' }}>
                            <h4>Outdoor Adventure</h4>
                            <input type="checkbox" name="tags" value="camping" checked={this.state.tags.includes("camping")} onChange={this.tagList} />Camping
                        <input type="checkbox" name="tags" value="hiking" checked={this.state.tags.includes("hiking")} onChange={this.tagList} />Hiking
                        <input type="checkbox" name="tags" value="sky-diving" checked={this.state.tags.includes("sky-diving")} onChange={this.tagList} />Sky-Diving
                    </div>
                        <div style={{ display: this.state.review_cat_type === "cultural" ? "block" : 'none' }}>
                            <h4>Cultural Immersion</h4>
                            <input type="checkbox" name="tags" value="ethnic" checked={this.state.tags.includes("ethnic")} onChange={this.tagList} />Ethnic Exchange
                         <input type="checkbox" name="tags" value="cooking" checked={this.state.tags.includes("cooking")} onChange={this.tagList} />Local Cooking Class
                         <input type="checkbox" name="tags" value="sport" checked={this.state.tags.includes("sport")} onChange={this.tagList} />Local Sport Activity
                    </div>
                        <div style={{ display: this.state.review_cat_type === "arts" ? "block" : 'none' }}>
                            <h4>Arts & Crafts</h4>
                            <input type="checkbox" name="tags" value="pottery" checked={this.state.tags.includes("pottery")} onChange={this.tagList} />Pottery Making
                        <input type="checkbox" name="tags" value="kite" checked={this.state.tags.includes("kite")} onChange={this.tagList} />Kite Making
                        <input type="checkbox" name="tags" value="painting" checked={this.state.tags.includes("painting")} onChange={this.tagList} />Cultural Painting
                    </div>


                        {/* Activity Detail */}
                        <div>
                            <h4>Activity Details</h4>
                            <label>Activity Package </label>
                            <input type="text" name="nameOfPlace" value={this.state.nameOfPlace} onChange={this.userFill} />
                            <label>Location</label>
                            <input type="text" name="address" value={this.state.address} onChange={this.userFill} placeholder="where activity is held" />
                        </div>

                        {/* Description */}
                        {this.templateFields()}
                    </div>
                    {/* End of activity workshop */}
                    
                    </Form>
                </Container>
            </React.Fragment >
        )
    }
}