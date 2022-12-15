import React,{ useState, useEffect } from "react";
import Classification from "./Classification";
import { getSpeciesByFilter } from "data/fetch";
import {Col, Row, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from "reactstrap";

function SimpleFilter(props){
    const {setSpeciesData} = props;
    const [conservation, setConservation] = useState("");
    const conservationList = ["Extinct","Endangered","Threatened","Species of Concern","Proposed Threatened","Proposed Endangered","not evaluated","Resident"];
    const [park,setPark] = useState("");
    const parksList = ["Acadia National Park","Arches National Park","Badlands National Park","Big Bend National Park","Biscayne National Park","Black Canyon of the Gunnison National Park","Bryce Canyon National Park","Canyonlands National Park","Capitol Reef National Park","Carlsbad Caverns National Park","Channel Islands National Park","Congaree National Park","Crater Lake National Park","Cuyahoga Valley National Park","Denali National Park and Preserve","Death Valley National Park","Dry Tortugas National Park","Everglades National Park","Gates Of The Arctic National Park and Preserve","Glacier National Park","Glacier Bay National Park and Preserve","Great Basin National Park","Grand Canyon National Park","Great Sand Dunes National Park and Preserve","Great Smoky Mountains National Park","Grand Teton National Park","Guadalupe Mountains National Park","Haleakala National Park","Hawaii Volcanoes National Park","Hot Springs National Park","Isle Royale National Park","Joshua Tree National Park","Katmai National Park and Preserve","Kenai Fjords National Park","Kobuk Valley National Park","Lake Clark National Park and Preserve","Lassen Volcanic National Park","Mammoth Cave National Park","Mesa Verde National Park","Mount Rainier National Park","North Cascades National Park","Olympic National Park","Petrified Forest National Park","Pinnacles National Park","Redwood National Park","Rocky Mountain National Park","Saguaro National Park","Sequoia and Kings Canyon National Parks","Shenandoah National Park","Theodore Roosevelt National Park","Voyageurs National Park","Wind Cave National Park","Wrangell - St Elias National Park and Preserve","Yellowstone National Park","Yosemite National Park","Zion National Park"];
    const [category, setCategory] = useState("");
    const [order, setOrder] = useState("");
    const [family, setFamily] = useState("");    
    
    const handleConservationChange = (event) => {
        const select = event.target.innerText
        setConservation(select);
    }

    const handleParkChange = (event) => {
        const select = event.target.innerText
        console.log("parks: ", select)
        setPark(select);
    }
    
    const handleSearch = async()=>{
        const query = {}
        if(conservation !== ""){
            query.conservation_status = conservation;
        }
        if(park !== ""){
            query.park_name = park;
        }
        if(category !== ""){
            query.category = category;
        }
        if(order !== ""){
            query.order = order;
        }
        if(family !== ""){
            query.family = family;
        }
        console.log("query", query);
        const result = await getSpeciesByFilter(query);
        console.log("result", result);
        const species = result.map((s)=>{
            return {
                scientificName: s.Scientific_Name,
                commonName: s.Common_Names,
            }
        });
        console.log("species", species);
        setSpeciesData(species);
    }

    return (
      <Row>
      <Col lg="2" sm="6">
        <UncontrolledDropdown>
          <DropdownToggle caret>
            {conservation === "" ? "Conservation Status" : conservation}
          </DropdownToggle>
          <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
            {conservationList.map((item, index) => {
                return <DropdownItem key={index} onClick = {handleConservationChange}>{item}</DropdownItem>
            })}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>


        <Col lg="2" sm="6">
        <UncontrolledDropdown>
            <DropdownToggle caret>
                {park === "" ? "National Park" : park}
            </DropdownToggle>
            <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                {parksList.map((item, index) => {
                    return <DropdownItem key={index} onClick = {handleParkChange}>{item}</DropdownItem>
                })}
            </DropdownMenu>
        </UncontrolledDropdown>
        </Col>

     

        <Col lg="2" sm="6">
            <Classification updateCategory ={setCategory} updateOrder = {setOrder} updateFamily={setFamily}/>
        </Col>
  
    <Col lg="2" sm="6">
        <Button onClick = {handleSearch}>Search</Button>
    </Col>
      </Row>
    )
  }

  export default SimpleFilter;