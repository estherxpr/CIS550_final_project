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


function SpeciesHeader() {
    let speciesHeader = React.createRef();
    const [firstFocus, setFirstFocus] = React.useState(false);

    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                speciesHeader.current.style.transform =
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
                        backgroundImage: "url(" + require("assets/img/species_all.jpg") + ")"
                    }}
                    ref={speciesHeader}
                ></div>
                 <h3 className="title">Species</h3>
                {/* <Container>
 
                    <h3 className="title">Species</h3>
                  
                    <Row>
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
                                    State
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
                                    Native
                                </DropdownToggle>
                                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                                    <DropdownItem>Yes</DropdownItem>
                                    <DropdownItem>No</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                        <Col lg="2" sm="6">
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    Endangered
                                </DropdownToggle>
                                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                                    <DropdownItem>Yes</DropdownItem>
                                    <DropdownItem>No</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                        <Col lg="2" sm="6">
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    Fire threaten
                                </DropdownToggle>
                                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                                    <DropdownItem>Yes</DropdownItem>
                                    <DropdownItem>No</DropdownItem>
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
                                    placeholder="Display %(e.g. 1, 2...)"
                                    type="text"
                                ></Input>
                            </FormGroup>
                        </Col>
                        <Col lg="3" sm="6">
                            <FormGroup>
                                <Input
                                    defaultValue=""
                                    placeholder="Category"
                                    type="text"
                                ></Input>
                            </FormGroup>
                        </Col>
                        <Col lg="3" sm="6">
                            <FormGroup>
                                <Input
                                    defaultValue=""
                                    placeholder="Family"
                                    type="text"
                                ></Input>
                            </FormGroup>
                        </Col>
                        <Col lg="3" sm="6">
                            <FormGroup>
                                <Input
                                    defaultValue=""
                                    placeholder="Order"
                                    type="text"
                                ></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button className="btn-round" color="default" type="button">
                        Go
                    </Button>
                </Container> */}
            </div>
        </>
    );
}

export default SpeciesHeader;
