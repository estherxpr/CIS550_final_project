import React from "react";

// reactstrap components
import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  InputGroup,
  Input,
  Button,
  FormGroup
} from "reactstrap";

// core components

function ParkPageHeader(props) {
  let pageHeader = React.createRef();
  const [firstFocus, setFirstFocus] = React.useState(false);

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
          <h3 className="title">{props.parkName}</h3>
          {/* <Dropdown group isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}> */}
          {/* <Row>
            <Col>
              <InputGroup
                className={
                  "no-border input-lg" + (firstFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Search By Species Name"
                  type="text"
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <Button className="btn-round" color="default" type="button">
              Go
            </Button>
          </Row>
          <p className="category">Or</p>
          <p className="category">Search By Conditions</p>
          <Row>
            <Col lg="2" sm="6">
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  FireLevel
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                  <DropdownItem>A</DropdownItem>
                  <DropdownItem>B</DropdownItem>
                  <DropdownItem>C</DropdownItem>
                  <DropdownItem>D</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col lg="2" sm="6">
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  Participate in Wild Trade
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                  <DropdownItem>Yes</DropdownItem>
                  <DropdownItem>No</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row>
            <Col lg="3" sm="6">
              <FormGroup>
                <Input
                  defaultValue=""
                  placeholder="Percentage(e.g. 1, 2...)"
                  type="text"
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Button className="btn-round" color="default" type="button">
            Go
          </Button> */}
        </Container>
      </div>
    </>
  );
}

export default ParkPageHeader;
