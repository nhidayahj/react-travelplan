import React from 'react'
import axios from 'axios'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io"

export default class Places extends React.Component {
    state = {
        places: "",
        dbPlaces: [],
        displayDest: false
    }

    continents = (e) => {
        this.setState({
            places: e.target.value
        })
    }

    async componentDidMount() {
        let response = await axios.get(baseUrl + "/allplaces");
        this.setState({
            dbPlaces: response.data
        })
    }

    filterSearch(select) {
        let userSelect = [];
        let allData = this.state.dbPlaces;
        for (let i of allData) {
            if (i.continent.continent === select) {
                userSelect.push(i)
            }
        }
        return userSelect;
    }

    displayPlaces() {
        let selected = this.state.places
        let displaySelect = this.filterSearch(selected)
        console.log(displaySelect)

        for (let places of displaySelect) {
            return (
                <React.Fragment>
                    <div>
                        <h3>{places.country}</h3>
                        <p>{places.location.city_town}</p>
                    </div>
                </React.Fragment>
            )
        }

    }




    render() {
        return (
            <React.Fragment>
                <label>Destinations: </label>
                {/* Display South America listings */}
                <select name="places" value={this.state.places} onChange={this.continents}>
                    <option>-- Destination --</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="africa">Africa</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania/Australia</option>
                </select>

                {/* Display user destination selection */}
                <div>
                    {this.displayPlaces()}
                </div>

            </React.Fragment>
        )

    }
}