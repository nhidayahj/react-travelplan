import './App.css';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';




function HomeNavBar (props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="page-title">wonderGo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Destinations
              </DropdownToggle>
              <DropdownMenu right>
                    <Link to="/australia">
                        <DropdownItem>
                        Australia
                        </DropdownItem>
                    </Link>
                    <Link to="/japan">
                        <DropdownItem>
                        Japan
                        </DropdownItem>
                    </Link>
                    <Link to="/korea">
                        <DropdownItem>
                        Korea
                        </DropdownItem>
                    </Link>
                    <Link to="/taiwan">
                        <DropdownItem>
                        Taiwan
                        </DropdownItem>
                    </Link>
                    <Link to="/thailand">
                        <DropdownItem>
                        Thailand
                        </DropdownItem>
                    </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Experiences
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/accommodations">
                        <DropdownItem>
                        Accommodations
                        </DropdownItem>
                    </Link>
                <Link to="/restaurants">
                        <DropdownItem>
                        Restaurants
                        </DropdownItem>
                    </Link>
                <Link to="/activities">
                        <DropdownItem>
                        Activities
                        </DropdownItem>
                    </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            
          </Nav>
         
        </Collapse>
      </Navbar>
    </div>
  );
}

export default HomeNavBar;