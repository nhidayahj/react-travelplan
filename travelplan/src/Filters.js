import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';


function Filters(props) {

    return (
        <div>
            <Nav>
                <NavItem>
                    <NavLink href="#">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">{props.filter_search}Accommodation</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Restaurant</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Activity</NavLink>
                </NavItem>
            </Nav>
            <hr />
        </div>
    )
}

export default Filters;