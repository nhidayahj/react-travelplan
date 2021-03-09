import React from 'react'


export default class Review extends React.Component {
    state = {
        username: "",
        continents: "",
        activity: "",
        activities: []
    }

    userFill = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    displayActivities() {
        if (this.state.activity === "outdoor") {
            return "outdoor"
        } else if (this.state.activity === "cultural") {
            return "cultural"
        } else if (this.state.activity === "arts") {
            return "arts"
        }
    }

    activityList = (e) => {
        let currentActivities = this.state[e.target.name];

        let modifiedActivities;

        if (!currentActivities.includes(e.target.value)) {
            modifiedActivities = [...currentActivities, e.target.value]
        } else {
            modifiedActivities = currentActivities.filter((element) => {
                return element != e.target.value
            })
        }

        this.setState({
            activities: modifiedActivities
        })
    }

    render() {
        return (
            <React.Fragment>
                <h3>Your Experience</h3>
                <div>
                    <label>Country Name: </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.userFill} />
                </div>

                <div>
                    <label>Continent: </label>
                    <select name="continents" value={this.state.continents} onChange={this.userFill}>
                        <option value="europe">Europe</option>
                        <option value="americas">Americas</option>
                        <option value="asia">Asia</option>
                        <option value="africa">Africa</option>
                        <option value="oceania">Australia / Oceania</option>
                    </select>
                </div>


                {/* Experience List */}
                <div>
                    <label>Activities</label>
                    <select name="activity" value={this.state.activity} onChange={this.userFill}>
                        <option value="outdoor">Outdoor Adventure</option>
                        <option value="cultural">Cultural Activity</option>
                        <option value="arts">Arts and Crafts</option>
                    </select>
                </div>
                <div style={{ display: this.displayActivities() === "outdoor" ? 'block' : 'none' }}>
                    <input type="checkbox"
                        name="activities"
                        value="outdoor-cooking"
                        onChange={this.activityList}
                        checked={this.state.activities.includes("outdoor-cooking")} />Outdoor Cooking

                     <input type="checkbox"
                        name="activities"
                        value="trekking"
                        onChange={this.activityList}
                        checked={this.state.activities.includes("trekking")} />Trekking

                    <input type="checkbox"
                        name="activities"
                        value="adventure"
                        onChange={this.activityList}
                        checked={this.state.activities.includes("adventure")} />Adventure

                    <input type="checkbox"
                        name="activities"
                        value="camping"
                        onChange={this.activityList}
                        checked={this.state.activities.includes("camping")} />Camping
                    <div>
                        <label>Location: </label>
                        <input type="text" name="location" value={this.state.location} onChange={this.userFill}></input>
                    </div>

                </div>

                <div style={{ display: this.displayActivities() === "cultural" ? 'block' : 'none' }}>
                    <input type="checkbox"
                        name="activities"
                        value=""
                        onChange={this.activityList}
                        checked={this.state.activities.includes("outdoor-cooking")} />Outdoor Cooking
                </div>


            </React.Fragment>
        )
    }
}