import React from 'react'
import axios from 'axios'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io"

export default class ShowReviews extends React.Component {
    state = {
        country:this.props.country,
        all_reviews: [],
        all_country:[]
    }

    async componentDidMount() {
        let allReviews = await axios.get(baseUrl + '/allreviews')
        
        this.setState({
            all_reviews: allReviews.data
        })
    }


    renderReview = () => {
        let accum = [];
        for (let review of this.state.all_reviews) {
            accum.push(
                <div key="review._id">
                    <h3>{review.review_category}</h3>
                    <p>Review Description: {review.review_desc}</p>
                    <p>Ratings: {review.ratings}</p>
                    <p>Reviewed by: {review.username}</p>

                </div>
            )
        }
        return accum;
    }

    render() {
        return (
            <React.Fragment>
                <h2>Show All Reviews</h2>

                {this.renderReview()}
            </React.Fragment>
        )
    }
}