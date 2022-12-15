import React,{useEffect, useState, createRef} from "react";
import ComplexFilter from "components/ComplexFilter.js";
import { useNavigate } from "react-router-dom";
import { getSpeciesByName } from "data/fetch";
// import Classification from "./Classification";
import SimpleFilter from "components/SimpleFilter.js";
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
// import { set } from "mongoose";




function SpeciesAllHeader(props) {
  const {setSpeciesData} = props;
  const navigate = useNavigate();
  let pageHeader = createRef();
  const [firstFocus, setFirstFocus] = useState(false);
  const [speciesName, setSpeciesName] = useState("");
  
  useEffect(() => {
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
  const handleInputChange =(event) => {
    const {value} = event.target;
    setSpeciesName(value);
    
  }
  const handleOnSearch = async() => {
    if(speciesName === "") return;
    const result = await getSpeciesByName(speciesName);
    if(!result || !result.scientific_name){ 
      setSpeciesName("");
      return;
    }
    navigate("/species/"+result.scientific_name);
  }


  return (
    <div>
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
          <h3 className="title">Species</h3>
          <Row>
            <Col>
              <InputGroup
                className={
                  "no-border input-lg" + (firstFocus ? " input-group-focus" : "")
                }
              >
                {/* # go to the specific species page */}
                <Input
                  placeholder="Search By Species Name"
                  type="text"
                  value = {speciesName}
                  onChange = {handleInputChange}
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                ></Input>
              </InputGroup>
            </Col>
            <Button className="btn-round" color="default" type="button" onClick = {handleOnSearch}>
              Search
            </Button>
          </Row>
          <p className="category">Or</p>
          <p className="category">Search By Conditions</p>
          <SimpleFilter setSpeciesData={setSpeciesData}/>
          <ComplexFilter/>
        </Container>
      </div>
    </div>
  );
}

export default SpeciesAllHeader;
