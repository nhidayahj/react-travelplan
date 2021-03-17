import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, 
} from 'reactstrap';
import { Link } from 'react-router-dom';

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/australia"

export default class Australia extends React.Component {
    state = {
        aus_reviews: [],
        country: [],
        filter_btn: this.props.filter_search,

    }

    async componentDidMount() {
        let response = await axios.get(baseUrl)
        this.setState({
            aus_reviews: response.data[0],
            country: response.data[1]
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



    // showEachReview(props, id) {
    //     let showReview = [];
    //     for (let i of this.state.aus_reviews) {
    //         if (id === i._id) {
    //             showReview.push(
    //                 <div>
    //                     <p>{props.review_id}</p>
    //                 </div>
    //             )
    //         }
    //     }
    //     return showReview;
    // }

    renderAllReview() {

        let aus_accum = [];
        for (let i of this.state.aus_reviews) {
            let obj = { review_id: i._id, country_id: i.country };
            aus_accum.push(
                <div key={i._id}>
                    <Card>
                        <CardImg top width="25%" height="50%" src={i.image_link} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">City: {i.city_town}</CardTitle>
                            <CardTitle tag="h5">Category: {i.review_category}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Reviewed by: {i.username}</CardSubtitle>
                            <CardText>{i.review_desc}</CardText>
                            <Link to={{ pathname: "/edit", state: obj }}><Button outline color="primary" size="sm">Edit</Button></Link>
                        </CardBody>
                    </Card>
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

    filterS



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
                {this.renderCountryInfo()}

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