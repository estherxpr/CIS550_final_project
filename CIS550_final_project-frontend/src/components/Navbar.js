import React from "react";

import { useNavigate } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";



function IndexNavbar() {
  let nav = useNavigate();

  const handleClickStates = () => {
      nav('/states');
  }

  const handleClickParks = () => {
    nav('/parks');
  }

  const handleClickSpecies = () => {
    nav('/species');
  }

  return (

      <Navbar className={"fixed-top navbar-transparent font-bold" } expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="/"
              target="_blank"
              id="navbar-brand"
            >
              National Parks
            </NavbarBrand>

            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
              }}

              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            // isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>

              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href=""
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Navigate</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/states" onClick={handleClickStates}>
                    {/* <NavLink href="/states"> */}
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                   states
                   {/* </NavLink> */}
                  </DropdownItem>
                  
                  <DropdownItem to="/parks" onClick={handleClickParks}>
                  {/* <NavLink href="/states"> */}
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    parks
                    {/* </NavLink> */}
                  </DropdownItem>
                 
                  <DropdownItem to="/species" onClick={handleClickSpecies}>
                  {/* <NavLink href="/states"> */}
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    species
                    {/* </NavLink> */}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

  );
}

export default IndexNavbar;
