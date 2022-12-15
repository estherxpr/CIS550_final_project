import React, { useState } from "react";
import { searchParks } from '../data/fetch';
import {

    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Button,

  } from "reactstrap";

function ParksComplexFilter(props){
    const {setParks} = props;
    const [keyword, setKeyword] = useState("");
    const [args, setArgs] = useState({});
   
    const handleOnClickKeyword = (e) => {
      //console.log("handelSelect",e.target.innerText);
      setKeyword(e.target.innerText)
    }
    
    const handleOnClickArg = (e) => {
        //console.log("args", e.target.className.split(" ")[0], e.target.innerText);
        const argType = e.target.className.split(" ")[0];
        const argValue = e.target.innerText;
        setArgs({...args, [argType]:argValue})
        console.log("args =", args);
    }

    const handleOnSubmit = async() => {
        // fetch data
        if(keyword !== ""){
            const query = {keyword, ...args}
            const result = await searchParks(query);
            if(result && result.length > 0){
                setParks(result);
            }
        }
    }

    const keywords = [ "fireClass", "fireSuffer"]
    const keywordOptions = keywords.map((keywordOption)=>{
        return <DropdownItem key ={keywordOption} onClick = {handleOnClickKeyword}>{keywordOption}</DropdownItem>
    })


    const argsComponentsMap = {
        // "orderDistribution": [{},{},{}],
        "fireClass": [{id: 1, name: "fire_size", type: "args", selections: ["A", "B", "C", "D", "E", "F", "G"]}],
        "fireSuffer": [{id: 2, name: "percent", type: "args", selections: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}]
    }

    //const argName = args.args? args.args: "selections"

    let argsComponents = null;
    if(keyword!==""){
        const params = argsComponentsMap[keyword];
        if(params && params.length > 0){
            argsComponents = params.map((arg)=>{
                return (
                    <Col lg="2" sm="6" key = {arg.id}>
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                {args.args? args.args: arg.name}
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

export default ParksComplexFilter;