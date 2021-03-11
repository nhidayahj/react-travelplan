import React from 'react'
import axios from 'axios'

const baseUrl = "https://3001-tan-dog-b6spunp9.ws-us03.gitpod.io"

export default class Review extends React.Component {
    state = {
        username: "",
        usercode: Math.floor(Math.random() * 9999 + 10000),
        city: "",
        country: "",
        review_cat_type: '',
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
        if (this.state.reviewCategory === "accommodation") {
            return "accommodation"
        } else if (this.state.reviewCategory === "restaurant") {
            return "restaurant"
        } else if (this.state.reviewCategory === "activities") {
            return "activities"
        }
    }

    tagList = (e) => {
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
            tags: modifiedActivities
        })
    }


    submitReview = async () => {
        // let category_id = await axios.post(baseUrl + '/category/review', {
        //     review_category:this.state.reviewCategory
        // })
        // // console.log(category_id.data._id)
        // console.log(category_id.data.insertedId)
    
        let all_review = await axios.post(baseUrl + '/createreviews', {
            username: this.state.username,
            usercode: this.state.usercode,
            countryName : this.state.country,
            cityTown: this.state.city,
            reviewCategory:this.state.reviewCategory,
            reviewType: this.state.review_cat_type,
            nameOfPlace: this.state.nameOfPlace,
            reviewAddress: this.state.address,
            reviewTags: this.state.tags,
            reviewDesc: this.state.reviewDesc,
            imageLink: this.state.image,
            ratings: this.state.ratings,
           
        })
        console.log(all_review.data)
        console.log("review id: ", all_review.data._id)

        // await axios.post(baseUrl + '/country', {
        //     review_id:all_review.data.insertedId,
        //     countryName: this.state.country,
        //     cityName: this.state.city
        // })
        // console.log(all_review.data.insertedId)



    }

    render() {
        return (
            <React.Fragment>
                <h2>Review a place you've visited</h2>


                <div>
                    <label>Country: </label>
                    <select name="country" value={this.state.country} onChange={this.userFill}>
                        <option> -- Select Country --</option>
                        <option value="Australia">Australia</option>
                        <option value="Japan">Japan</option>
                        <option value="Korea">Korea</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Taiwan">Taiwan</option>
                    </select>
                </div>

                <div>
                    <label>City / Town: </label>
                    <input type="text" name="city" value={this.state.city} onChange={this.userFill} />
                </div>


                {/* Experience List */}
                <div>
                    <label>Review Category: </label>
                    <select name="reviewCategory" value={this.state.reviewCategory} onChange={this.userFill}>
                        <option>-- Select Review type --</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="restaurant">Restaurants</option>
                        <option value="activities">Activities</option>

                    </select>
                </div>

                <div style={{ display: this.displayActivities() === "accommodation" ? 'block' : 'none' }}>
                    <div>
                        <h4>Accommodation Type: </h4>
                        <input type="radio" name="review_cat_type" value="hotel" onChange={this.userFill} checked={this.state.review_cat_type == "hotel"} /> Hotel
                            <input type="radio" name="review_cat_type" value="airbnb" onChange={this.userFill} checked={this.state.review_cat_type == "airbnb"} /> Airbnb
                            <input type="radio" name="review_cat_type" value="hostel" onChange={this.userFill} checked={this.state.review_cat_type == "hostel"} /> Hostel
                    </div>

                    {/* Acccommodation Details */}
                    <div>
                        <h4>Accommodation Details</h4>
                        <label>Name of {this.state.review_cat_type}: </label>
                        <input type="text" name="nameOfPlace" value={this.state.nameOfPlace} onChange={this.userFill} />
                    </div>
                    <div>
                        <label>Address of {this.state.review_cat_type}: </label>
                        <input type="text" name="address" value={this.state.address} onChange={this.userFill} />
                    </div>

                    {/* Amenities */}
                    <h4>Facilities</h4>
                    <div>
                        <input type="checkbox"
                            name="tags"
                            value="room-service"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("room-service")} />Room Service

                        <input type="checkbox"
                            name="tags"
                            value="wifi"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("wifi")} />Free Wifi

                        <input type="checkbox"
                            name="tags"
                            value="breakfast"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("breakfast")} />All-Day Breakfast

                        <input type="checkbox"
                            name="tags"
                            value="activity-deals"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("activity-deals")} /> Deals/Packages

                        <input type="checkbox"
                            name="tags"
                            value="non-smoking-rooms"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("non-smoking-rooms")} /> Non-smoking rooms

                        <input type="checkbox"
                            name="tags"
                            value="gym"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("gym")} /> Gym Center
                    </div>

                    {/* Description */}
                    <div>
                        <h4>Review Description</h4>
                        <textarea name="reviewDesc" value={this.state.reviewDesc} onChange={this.userFill} />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <h4>Image URL</h4>
                        <input type="text" name="image" value={this.state.image} onChange={this.userFill} />
                    </div>

                    {/* Ratings */}
                    <div>
                        <h4>Ratings</h4>
                        <input type="radio" name="ratings" value="poor" checked={this.state.ratings == "poor"} onChange={this.userFill} />Poor
                       <input type="radio" name="ratings" value="good" checked={this.state.ratings == "good"} onChange={this.userFill} />Good
                       <input type="radio" name="ratings" value="excellent" checked={this.state.ratings == "excellent"} onChange={this.userFill} />Excellent

                   </div>

                    {/* User codes for validation */}
                    <div>
                        <label>Username: </label>
                        <input type="text" name="username" value={this.state.username} onChange={this.userFill} />
                        <label>User code: {this.state.usercode} </label>
                    </div>

                    {/* Buttons */}
                    <div>
                        <button onClick={this.submitReview}>Submit</button>
                        <button>Cancel</button>
                    </div>

                </div>
                {/* End of Accommodation */}

                <div style={{ display: this.displayActivities() === "restaurant" ? 'block' : 'none' }}>

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
                            value="international"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("international")} />International

                        <input type="checkbox"
                            name="tags"
                            value="fusion"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("fusion")} />Fusion


                        <input type="checkbox"
                            name="tags"
                            value="asian"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("asian")} />Asian

                        <input type="checkbox"
                            name="tags"
                            value="bbq"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("bbq")} />BBQ


                        <input type="checkbox"
                            name="tags"
                            value="bakery"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("bakery")} />Bakery

                        <input type="checkbox"
                            name="tags"
                            value="dessert"
                            onChange={this.tagList}
                            checked={this.state.tags.includes("dessert")} />Dessert
                    </div>
                    {/* Restaurant Cuisines */}


                    {/* Description */}
                    <div>
                        <h4>Review Description</h4>
                        <textarea name="reviewDesc" value={this.state.reviewDesc} onChange={this.userFill} />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <h4>Image URL</h4>
                        <input type="text" name="image" value={this.state.image} onChange={this.userFill} />
                    </div>

                    {/* Ratings */}
                    <div>
                        <h4>Ratings</h4>
                        <input type="radio" name="ratings" value="poor" checked={this.state.ratings == "poor"} onChange={this.userFill} />Poor
                       <input type="radio" name="ratings" value="good" checked={this.state.ratings == "good"} onChange={this.userFill} />Good
                       <input type="radio" name="ratings" value="excellent" checked={this.state.ratings == "excellent"} onChange={this.userFill} />Excellent

                   </div>

                    {/* User codes for validation */}
                    <div>
                        <label>Username: </label>
                        <input type="text" name="username" value={this.state.username} onChange={this.userFill} />
                        <label>User code: {this.state.usercode} </label>
                    </div>

                    {/* Buttons */}
                    <div>
                        <button onClick={this.submitReview}>Submit</button>
                        <button>Cancel</button>
                    </div>
                </div>
                {/* End of restaurant */}

                <div style={{ display: this.displayActivities() === 'activities' ? 'block' : 'none' }}>
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
                        <input type="checkbox" name="tags" value="others" checked={this.state.tags.includes("others")} onChange={this.tagList} />Others
                    </div>
                    <div style={{ display: this.state.review_cat_type === "cultural" ? "block" : 'none' }}>
                        <h4>Cultural Immersion</h4>
                        <input type="checkbox" name="tags" value="museum" checked={this.state.tags.includes("museum")} onChange={this.tagList} />Museum Visit
                         <input type="checkbox" name="tags" value="ethnic" checked={this.state.tags.includes("ethnic")} onChange={this.tagList} />Ethnic Exchange
                         <input type="checkbox" name="tags" value="cooking" checked={this.state.tags.includes("cooking")} onChange={this.tagList} />Local Cooking Class
                         <input type="checkbox" name="tags" value="sport" checked={this.state.tags.includes("sport")} onChange={this.tagList} />Local Sport Activity
                         <input type="checkbox" name="tags" value="others" checked={this.state.tags.includes("others")} onChange={this.tagList} />Others
                    </div>
                    <div style={{ display: this.state.review_cat_type === "arts" ? "block" : 'none'}}>
                        <h4>Arts & Crafts</h4>
                        <input type="checkbox" name="tags" value="pottery" checked={this.state.tags.includes("pottery")} onChange={this.tagList} />Pottery Making
                        <input type="checkbox" name="tags" value="kite" checked={this.state.tags.includes("kite")} onChange={this.tagList} />Kite Making
                        <input type="checkbox" name="tags" value="painting" checked={this.state.tags.includes("painting")} onChange={this.tagList} />Cultural Painting
                        <input type="checkbox" name="tags" value="others" checked={this.state.tags.includes("others")} onChange={this.tagList} />Others
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
                    <div>
                        <h4>Review Description</h4>
                        <textarea name="reviewDesc" value={this.state.reviewDesc} onChange={this.userFill} />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <h4>Image URL</h4>
                        <input type="text" name="image" value={this.state.image} onChange={this.userFill} />
                    </div>

                    {/* Ratings */}
                    <div>
                        <h4>Ratings</h4>
                        <input type="radio" name="ratings" value="poor" checked={this.state.ratings == "poor"} onChange={this.userFill} />Poor
                       <input type="radio" name="ratings" value="good" checked={this.state.ratings == "good"} onChange={this.userFill} />Good
                       <input type="radio" name="ratings" value="excellent" checked={this.state.ratings == "excellent"} onChange={this.userFill} />Excellent

                   </div>

                    {/* User codes for validation */}
                    <div>
                        <label>Username: </label>
                        <input type="text" name="username" value={this.state.username} onChange={this.userFill} />
                        <label>User code: {this.state.usercode} </label>
                    </div>

                    {/* Buttons */}
                    <div>
                        <button onClick={this.submitReview}>Submit</button>
                        <button>Cancel</button>
                    </div>

                </div>
                {/* End of activity workshop */}




            </React.Fragment>
        )
    }
}