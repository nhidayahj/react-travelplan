import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io/all"

export default class Homepage extends React.Component {
    state = {
        all_countries: []
    }

    async componentDidMount() {
        let allCountries = await axios.get(baseUrl)
        this.setState({
            all_countries: allCountries.data
        })
    }

    renderCountries() {
        let card_country = [];
        for (let i of this.state.all_countries) {
            card_country.push(

                <Col sm="4">
                    <Card outline color="info" className="card-country">
                        <CardImg className="each-card" top width="100%" src={i.image_url} alt="country image cap" />
                        <CardBody>
                            <CardTitle className="text-center" tag="h5">{i.country}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted text-center">Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button>Button</Button>
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

                </div>
                <Container>


                    <div className="home-section">
                        <div className="title-header">
                            <h3 className="page-title">Popular Destinations</h3>
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
                        <Link to="/australia"><button>Australia</button></Link>
                        <Link to="/japan"><button>Japan</button></Link>
                        <Link to="/korea"><button>Korea</button></Link>
                        <Link to="/taiwan"><button>Taiwan</button></Link>
                        <Link to="/thailand"><button>Thailand</button></Link>
                    </div>
                </Container>

            </React.Fragment>
        )
    }
}



