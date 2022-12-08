import React from "react";

// reactstrap components
import { Container, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, } from "reactstrap";

// core components


function StatePageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/parks.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          {/* <div className="photo-container">
            <img alt="..." src={require("assets/img/ryan.jpg")}></img>
          </div> */}
          <h3 className="title">State</h3>
          {/* <Dropdown group isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}> */}
          <UncontrolledDropdown>
            <DropdownToggle caret>
              State
            </DropdownToggle>
            <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
              <DropdownItem>PA</DropdownItem>
              <DropdownItem>CA</DropdownItem>
              <DropdownItem>WA</DropdownItem>
              <DropdownItem>NY</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <p className="category">State Name</p>
          <div className="content">
            <div className="social-description">
              <p>number of parks</p>
              <h2>Parks</h2>
            </div>
            <div className="social-description">
              <p>number of species</p>
              <h2>Species</h2>
            </div>
          </div>
        </Container >
      </div >
    </>
  );
}

export default StatePageHeader;
