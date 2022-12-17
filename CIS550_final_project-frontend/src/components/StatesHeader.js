import React,{useEffect, useState,  createRef} from "react";

// reactstrap components
import { Container, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from "reactstrap";

import { getSpeciesByState,getParksByState } from "data/fetch";

function StatePageHeader(props) {
  const {state, setState} = props;
  let pageHeader = createRef();

  const [speciesNum, setSpeciesNum] = useState(0);
  const [parksNum, setParksNum] = useState(0);
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
  
  useEffect(()=>{
    const fetchData = async () => {

        const species = await getSpeciesByState(state);
        const speciesCount = species.length;
        setSpeciesNum(speciesCount);
        const parks = await getParksByState(state);
        const parksCount = parks.length;
        setParksNum(parksCount);

    }     
    if(state && state.length > 0){
      fetchData();
    }
  }, [state])



  const handleOnClick = (e) => {
    if(e.target.innerText){
      setState(e.target.innerText);
    }
  }


  const states = ['AR','AZ','CA','CO','FL','HI',
  'ID','KY','ME','MI','MN','MT','NC','ND','NM',
  'NV','OH','OR','SC','SD','TN','TX','UT','VA','WA','WY']
  const dropItems = states.map((state) => {
    return <DropdownItem key={state} onClick ={handleOnClick}>{state}</DropdownItem>
  })

  const stateName = state ? state : "State";

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
          {/* <div className="photo-container">
            <img alt="..." src={require("assets/img/ryan.jpg")}></img>
          </div> */}
          <h3 className="title">{stateName}</h3>
          {/* <Dropdown group isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}> */}
          <UncontrolledDropdown>
            <DropdownToggle caret>
              {stateName}
            </DropdownToggle>
            <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }}  container="body">
              {dropItems}
            </DropdownMenu>
          </UncontrolledDropdown>
          <p className="category">State Name</p>
          <div className="content">
            <div className="social-description">
              <p>{parksNum}</p>
              <h2>Parks</h2>
            </div>
            <div className="social-description">
              <p>{speciesNum}</p>
              <h2>Species</h2>
            </div>
          </div>
        </Container >
      </div >
    </div>
  );
}

export default StatePageHeader;
