import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';


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
                // <div key={i._id}>
                //     <p>City: {i.city_town}</p>
                //     <p>Category: {i.review_category}</p>
                //     <p>Review Description: {i.review_desc}</p>
                //     <p>Reviewed by: {i.username}</p>
                //     <Button outline color="primary" size="sm">Update</Button>{' '}
                //     <Button color="danger" size="sm">Delete</Button>
                // </div>
                <div key={i._id}>
                    <Card>
                        <CardImg top width="25%" height="50%" src="https://images.squarespace-cdn.com/content/v1/55ee34aae4b0bf70212ada4c/1577545161018-1F9Z9ZZQG9JO2O4WCWQX/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/keith-zhu-qaNcz43MeY8-unsplash+%281%29.jpg?format=1500w" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">City: {i.city_town}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Reviewed by: {i.username}</CardSubtitle>
                            <CardText>{i.review_desc}</CardText>
                            <Button outline color="primary" size="sm">Update</Button>{' '}
                            <Button color="danger" size="sm">Delete</Button>
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
                <h3 className="country">Australia</h3>
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