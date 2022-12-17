import React,{useEffect, useState,  createRef, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { getParksByState } from '../data/fetch';
import ParksComplexFilter from "./ParksComplexFilter";
import { checkPark } from "../data/fetch";
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
} from "reactstrap";

// core components


function ParksPageHeader(props) {
  let pageHeader = createRef();
  let navigate = useNavigate();
  const {parks, setParks} = props;
  const [firstFocus, setFirstFocus] = React.useState(false);
  const {state, setState} = props;
  const [parksNum, setParksNum] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [input, setInput] = useState("");
  const parkSetter = useRef(setParks);

  // useEffect(() => {
  //   if (window.innerWidth > 991) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.pageYOffset / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //     window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });
  
  useEffect(()=>{
    const fetchData = async () => {
        const parks = await getParksByState(state);
        const parksCount = parks.length;
        setParksNum(parksCount);
    }     
    if(state && state.length > 0){
      fetchData();
    }
  }, [state])

  const selectState = (e) => {
    // console.log(e.target.innerText);
    if(e.target.innerText){
      // setState(e.target.innerText);
      setSelectedState(e.target.innerText);
    }
  }

  const getResults = () => {
    if (selectState !== "") {
      setState(selectedState);
    }
  }

  const handleInput = (e) => {
      setInput(e.target.value);
  }

  const handleSearch = async() => {
      if(input === "") return;
      try{
        const result = await checkPark(input);
        if(result && result.Name){
          navigate(`/parks/${input}`);
        }else{
          setInput("");
        }
      }catch(err){
        console.log(err);
      }
    }

  const states = ['AR','AZ','CA','CO','FL','HI',
  'ID','KY','ME','MI','MN','MT','NC','ND','NM',
  'NV','OH','OR','SC','SD','TN','TX','UT','VA','WA','WY']
  const dropItems = states.map((state) => {
    return <DropdownItem key={state} onClick ={selectState}>{state}</DropdownItem>
  })
  const stateName = selectedState !== "" ? selectedState : "State";

  return (
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
          <h3 className="title">Parks</h3>
          {/* <Dropdown group isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}> */}
          <Row>
            <Col>
              <InputGroup
                className={
                  "no-border input-lg" + (firstFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Search By Park Name"
                  type="text"
                  value = {input}
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                  onChange = {handleInput}
                ></Input>
              </InputGroup>
            </Col>
            <Button className="btn-round" color="default" type="button" onClick={handleSearch}>
              Search
            </Button>
          </Row>
          <p className="category">Or</p>
          <p className="category">Search By Conditions</p>
          <Row>
            <Col lg="2" sm="6">
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {stateName}
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }}  container="body">
                  {dropItems}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col>
              <Button className="btn-round" color="default" type="button" onClick={getResults}>
                  Search
              </Button>
            </Col>
            <Col>
              <p>{parksNum}</p>
              <h3>Parks</h3>
            </Col>
          </Row>
          <ParksComplexFilter setParks={parkSetter.current}/>
        </Container>
      </div>
  );
}

export default ParksPageHeader;
