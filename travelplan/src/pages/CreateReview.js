import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const baseUrl = "https://nhj-travelplan-project-tgc11.herokuapp.com";


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
        tags: [],

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
                            <Input type="textarea" name="reviewDesc" value={this.state.reviewDesc} onChange={this.userFill}
                                placeholder="be descriptive as possible!" maxLength={300} />
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
                <Row>
                    <Col>
                        <FormGroup>
                            <legend>Username</legend>
                            <Input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.userFill}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <div className="review-form-btns">
                    <Button className="submit" color="primary" onClick={this.submitReview}>Submit</Button>{' '}
                    <Link to="/"><Button color="danger">Cancel</Button></Link>
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
        if (all_review.status === 200) {
            this.setState({
                status: true
            })
            window.location = `/${this.state.country.toLowerCase()}`
        } else {
            this.setState({
                status: false
            })
        }
        // this.displayConfirm(all_review.status);

        console.log(all_review)
        console.log(all_review.data)
        console.log("review id: ", all_review.data._id)
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Container className="review-body">
                        <h2 className="page-title">Create a Review</h2>
                        <Form>
                            <Row>
                                <Col sm="4" md="6">
                                    <FormGroup>
                                        <legend>Country</legend>
                                        <Input type="select" name="country" value={this.state.country} onChange={this.userFill}>
                                            <option value="select">Select a Country</option>
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
                                            <option value="select">Select Category</option>
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
                                <FormGroup tag="fieldset">
                                    <legend>Restaurant Mood</legend>
                                    <FormGroup check>
                                        <Input type="radio" name="reviewType"
                                            value="fine-dining" onChange={this.userFill} checked={this.state.reviewType === "fine-dining"} />
                                        <Label>Fine Dining</Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="radio" name="reviewType"
                                            value="casual-dining" onChange={this.userFill} checked={this.state.reviewType === "casual-dining"} />
                                        <Label>Casual Dining</Label>

                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="radio" name="reviewType"
                                            value="street-food" onChange={this.userFill} checked={this.state.reviewType === "street-food"} />
                                        <Label>Street Food</Label>
                                    </FormGroup>
                                </FormGroup>
                                <Row>
                                    <Col>
                                        <legend>Restaurant Details</legend>
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
                                            <Label>Location</Label>
                                            <Input type="text" name="address"
                                                value={this.state.address} onChange={this.userFill} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <legend>Service Available</legend>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="4">
                                        <FormGroup check inline>
                                            <Input type="checkbox" name="tags" value="dine-in" onChange={this.tagList}
                                                checked={this.state.tags.includes("dine-in")} />
                                            <Label check>Dine-In</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4">
                                        <FormGroup check inline>
                                            <Input type="checkbox" name="tags" value="takeaway" onChange={this.tagList}
                                                checked={this.state.tags.includes("takeaway")} />
                                            <Label check>Takeaway</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4">
                                        <FormGroup check inline>
                                            <Input type="checkbox" name="tags" value="drive-thru" onChange={this.tagList}
                                                checked={this.state.tags.includes("drive-thru")} />
                                            <Label check>Drive-Thru</Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <legend>Menu Type</legend>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="4">
                                        <FormGroup check inline>
                                            <Input type="checkbox" name="tags" value="fusion" onChange={this.tagList}
                                                checked={this.state.tags.includes("fusion")} />
                                            <Label check>Fusion</Label>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4">
                                        <FormGroup check inline>
                                            <Input type="checkbox" name="tags" value="western" onChange={this.tagList}
                                                checked={this.state.tags.includes("western")} />
                                            <Label check>Western</Label>
                                        </FormGroup>
                                    </Col>

                                    <Col sm="4">
                                        <FormGroup check inline>
                                            <Input type="checkbox" name="tags" value="dessert" onChange={this.tagList}
                                                checked={this.state.tags.includes("dessert")} />
                                            <Label check>Dessert</Label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {this.templateFields()}
                            </div>
                            {/* End of restaurant */}

                            <div style={{ display: this.displayActivities() === 'Activities' ? 'block' : 'none' }}>
                                {/* type of activities */}
                                <FormGroup tag="fieldset">
                                    <legend>Travel Activities</legend>
                                    <FormGroup check>
                                        <Input type="radio" name="reviewType"
                                            value="outdoor" onChange={this.userFill} checked={this.state.reviewType === "outdoor"} />
                                        <Label>Outdoor Activities</Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="radio" name="reviewType"
                                            value="cultural" onChange={this.userFill} checked={this.state.reviewType === "cultural"} />
                                        <Label>Cultural Workshop</Label>

                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="radio" name="reviewType"
                                            value="arts" onChange={this.userFill} checked={this.state.reviewType === "arts"} />
                                        <Label>Arts & Crafts</Label>
                                    </FormGroup>
                                </FormGroup>

                                <div style={{ display: this.state.reviewType === "outdoor" ? "block" : 'none' }}>
                                    <Row>
                                        <Col>
                                            <legend>Outdoor Adventure</legend>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="camping" onChange={this.tagList}
                                                    checked={this.state.tags.includes("camping")} />
                                                <Label check>Camping</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="hiking" onChange={this.tagList}
                                                    checked={this.state.tags.includes("hiking")} />
                                                <Label check>Hiking</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="sky-diving" onChange={this.tagList}
                                                    checked={this.state.tags.includes("sky-diving")} />
                                                <Label check>Sky-Diving</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{ display: this.state.reviewType === "cultural" ? "block" : 'none' }}>
                                    <Row>
                                        <Col>
                                            <legend>Cultural Immersion</legend>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="ethnic" onChange={this.tagList}
                                                    checked={this.state.tags.includes("ethnic")} />
                                                <Label check>Cultural Exchange</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="cooking" onChange={this.tagList}
                                                    checked={this.state.tags.includes("cooking")} />
                                                <Label check>Local Cooking Class</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="sport" onChange={this.tagList}
                                                    checked={this.state.tags.includes("sport")} />
                                                <Label check>Local Sport Activity</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{ display: this.state.reviewType === "arts" ? "block" : 'none' }}>
                                    <Row>
                                        <Col>
                                            <legend>Arts & Crafts</legend>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="pottery" onChange={this.tagList}
                                                    checked={this.state.tags.includes("pottery")} />
                                                <Label check>Pottery Making</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="kite" onChange={this.tagList}
                                                    checked={this.state.tags.includes("kite")} />
                                                <Label check>Kite Making</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup check inline>
                                                <Input type="checkbox" name="tags" value="painting" onChange={this.tagList}
                                                    checked={this.state.tags.includes("painting")} />
                                                <Label check>Cultural Painting</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <Row>
                                    <Col>
                                        <legend>Activity Details</legend>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="4" md="6">
                                        <FormGroup>
                                            <Label>Activity Package</Label>
                                            <Input type="text" name="nameOfPlace"
                                                value={this.state.nameOfPlace} onChange={this.userFill} />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="4" md="6">
                                        <FormGroup>
                                            <Label>Location</Label>
                                            <Input type="text" name="address"
                                                value={this.state.address} onChange={this.userFill} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {/* Description */}
                                {this.templateFields()}
                            </div>
                            {/* End of activity workshop */}
                        </Form>
                    </Container>
                </div>
                <div style={{ display: this.state.status === false ? 'block' : 'none' }}>
                    <React.Fragment>
                        <h3 className="page-title-display">Error posting. Please check that all fields are filled up.</h3>
                        <Link to="#"><Button color="danger" size="sm">Ok</Button></Link>
                    </React.Fragment>
                </div>

            </React.Fragment >
        )
    }
}