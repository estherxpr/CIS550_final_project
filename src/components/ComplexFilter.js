import React, { useState } from "react";
import { searchSpecies } from "data/fetch";
import {

    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Button,

  } from "reactstrap";

function ComplexFilter(props){
    const {setSpeciesData} = props;
    const [keyword, setKeyword] = useState("");
    const [args, setArgs] = useState({});

    const handleOnClickKeyword = (e) => {
      console.log("handelSelect",e.target.innerText);
      setKeyword(e.target.innerText)
    }
    
    const handleOnClickArg = (e) => {
        console.log("args", e.target.className.split(" ")[0], e.target.innerText);
        const argType = e.target.className.split(" ")[0];
        const argValue = e.target.innerText;
        setArgs({...args, [argType]:argValue})
    }

    const handleOnSubmit = async() => {
        // fetch data
        if(keyword !== ""){
            const query = {keyword, ...args}
            const result = await searchSpecies(query);
            if(result && result.length > 0){
                setSpeciesData(result);
            }
        }
    }

    const keywords = [ "sameCountryTrade", "sameFamily", "threeStates"]
    const keywordOptions = keywords.map((keywordOption)=>{
      return <DropdownItem onClick = {handleOnClickKeyword}>{keywordOption}</DropdownItem>
    })


    const argsComponentsMap = {
        // "orderDistribution": [{},{},{}],
        "sameCountry": [],
        "sameFamily": [{type:"park",selections:["Acadia National Park","Arches National Park","Badlands National Park","Big Bend National Park","Biscayne National Park","Black Canyon of the Gunnison National Park","Bryce Canyon National Park","Canyonlands National Park","Capitol Reef National Park","Carlsbad Caverns National Park","Channel Islands National Park","Congaree National Park","Crater Lake National Park","Cuyahoga Valley National Park","Denali National Park and Preserve","Death Valley National Park","Dry Tortugas National Park","Everglades National Park","Gates Of The Arctic National Park and Preserve","Glacier National Park","Glacier Bay National Park and Preserve","Great Basin National Park","Grand Canyon National Park","Great Sand Dunes National Park and Preserve","Great Smoky Mountains National Park","Grand Teton National Park","Guadalupe Mountains National Park","Haleakala National Park","Hawaii Volcanoes National Park","Hot Springs National Park","Isle Royale National Park","Joshua Tree National Park","Katmai National Park and Preserve","Kenai Fjords National Park","Kobuk Valley National Park","Lake Clark National Park and Preserve","Lassen Volcanic National Park","Mammoth Cave National Park","Mesa Verde National Park","Mount Rainier National Park","North Cascades National Park","Olympic National Park","Petrified Forest National Park","Pinnacles National Park","Redwood National Park","Rocky Mountain National Park","Saguaro National Park","Sequoia and Kings Canyon National Parks","Shenandoah National Park","Theodore Roosevelt National Park","Voyageurs National Park","Wind Cave National Park","Wrangell - St Elias National Park and Preserve","Yellowstone National Park","Yosemite National Park","Zion National Park"]},
            {type:"family",selections:[]},
            {type:"order",selections:[]}],
        "threeStates": []
    }


    let argsComponents = null;
    if(keyword!==""){
        const args = argsComponentsMap[keyword];
        if(args && args.length > 0){
            argsComponents = args.map((arg)=>{
                return (
                    <Col lg="2" sm="6" key = {arg.type}>
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                {arg.type}
                            </DropdownToggle>
                            <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
                                {arg.selections.map((selection)=>{
                                    return <DropdownItem key={selection} className={arg.type} onClick = {handleOnClickArg}>{selection}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                )
            }
            )
        }
    }
  
       
    return (
      <Row>
    
      <Col lg="2" sm="6">
        <UncontrolledDropdown>
          <DropdownToggle caret>
            {keyword === "" ? "Advanced Search" : keyword}
          </DropdownToggle>
          <DropdownMenu style={{ maxHeight: "100px", overflow: "scroll" }} container="body">
            {keywordOptions}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
        {argsComponents}
        {keyword !== ""? <Button className="btn-round" color="default" type="button" onClick = {handleOnSubmit}>
            Complex Search
          </Button> : null}
    </Row>
  
  
    )
  
  
  }

export default ComplexFilter;