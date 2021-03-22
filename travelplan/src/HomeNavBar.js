import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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




function HomeNavBar(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
            <div>
              <Navbar color="light" light expand="md">
                <Link to="/"><NavbarBrand className="page-title">wanderLust</NavbarBrand></Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Destination
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
                                South Korea
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
                        Reviews
                      </DropdownToggle>
                      <DropdownMenu right>
                            <Link to="/create">
                                <DropdownItem>
                                Create
                                </DropdownItem>
                            </Link>
                            
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    {/* <NavItem>
                      <Link to="/create">Create Review</Link>
                    </NavItem> */}
                  </Nav>

                </Collapse>
              </Navbar>
            </div>
          );
        
}

export default HomeNavBar;