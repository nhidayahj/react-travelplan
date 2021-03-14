import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Badge
} from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/all"

export default class Homepage extends React.Component {
    state = {
        all_countries: [],
        all_reviews: []
    }

    async componentDidMount() {
        let result = await axios.get(baseUrl)
        this.setState({
            all_countries: result.data[0],
            all_reviews: result.data[1]
        })
    }

    renderCountries() {
        let card_country = [];
        for (let i of this.state.all_countries) {
            card_country.push(

                <Col sm="4">
                    <Card outline color="info" className="card-country">
                        <CardImg className="each-card" top width="100%" src={i.image_url} alt="country image cap" />
                        <CardBody className="each-card-body">
                            <CardTitle className="text-center" tag="h5">{i.country}</CardTitle>
                            {/* <CardSubtitle tag="h6" className="mb-2 text-muted text-center">Card subtitle</CardSubtitle> */}
                            <CardText>{i.description}</CardText>
                            <Link to={i.country}><Badge href="#" color="info" pill>explore</Badge></Link>
                        </CardBody>
                    </Card>
                </Col>
            )
        }
        return card_country;
    }


    render() {
        return (
            <React.Fragment>
                <div className="page-img">
                    <span className="home-title">wanderLust</span>
                </div>
                <Container>
                    <div className="home-section">
                        <div className="title-header">
                            <h3 className="page-title">Popular Destination</h3>
                        </div>
                        <div>
                            <Row>
                                {this.renderCountries()}
                            </Row>
                        </div>
                    </div>

                    <div className="home-section">
                        <div className="title-header">
                            <h3 className="page-title">Places & Experiences</h3>
                        </div>
                        <div >

                        </div>
                        
                    </div>
                </Container>

            </React.Fragment>
        )
    }
}



