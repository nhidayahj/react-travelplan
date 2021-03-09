import React from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Homepage from './pages/Homepage'
import Americas from './pages/Americas'
import Europe from './pages/Europe'
import Asia from './pages/Asia'
import Africa from './pages/Africa'
import Oceania from './pages/Oceania'



class NavbarPage extends React.Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">wonderGo</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/homepage">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Destination</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="/americas">Americas</MDBDropdownItem>
                  <MDBDropdownItem href="/europe">Europe</MDBDropdownItem>
                  <MDBDropdownItem href="/asia">Asia</MDBDropdownItem>
                  <MDBDropdownItem href="africa">Africa</MDBDropdownItem>
                  <MDBDropdownItem href="/oceania">Oceania / Australia</MDBDropdownItem>
                  
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/allExperience">Experience</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Blogs</MDBNavLink>
            </MDBNavItem>
            
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <Switch>
          <Route exact path="/homepage">
              <Homepage/>
          </Route>
          <Route exact path="/americas">
              <Americas/>
          </Route>
          <Route exact path="/europe">
              <Europe/>
          </Route>
          <Route exact path="/asia">
              <Asia/>
          </Route>
          <Route exact path="/africa">
              <Africa/>
          </Route>
          <Route exact path="/oceania">
              <Oceania/>
          </Route>
      </Switch>
    </Router>
    );
  }
}

export default NavbarPage;