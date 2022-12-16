import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ParksScroll from "components/ParksScroll";
import IndexNavbar from "components/Navbar.js";
// reactstrap components
import {

  Container,

  Table,
} from "reactstrap";

// core components
import ParksPageHeader from "../components/ParksHeader";
import { getParksByState } from "../data/fetch";


function ParksTable({parks}){
  let parksRow = null;
  if (parks.length > 0) {
    parksRow = parks.map((park) => {
      return (
        <tr key={park.Name}>
          <td><Link to = {`/parks/${park.Code}`} >{park.Code}</Link></td>
          <td><Link to = {`/parks/${park.Name}`} >{park.Name}</Link></td>
          <td>{park.Acres}</td>
        </tr>
      );
    });
  }
  return (
    <div>
    <IndexNavbar />
    <h3 className="title">Parks</h3>
    <Table bordered height="200">
      <thead>
        <tr>
          <th scope="col">Park Code</th>
          <th scope="col">Park Name</th>
          <th scope="col">Acres</th>
        </tr>
      </thead>
      <tbody>
        {parksRow}
      </tbody>
    </Table>
    </div>
  )
}


function ParksPage() {
  const [state, setState] = useState("");
  const [parks, setParks] = useState([]);
  useEffect(() => {
    // console.log(parkArr);
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await getParksByState(state);
        setParks(res);
      } catch (err) {
        console.log(err);
      }
    };
    if(state && state !== ""){
      fetchData();
    }
  },[state]);

  return (
    <div>
      <IndexNavbar />
      <div className="wrapper">
        <ParksPageHeader state={state} setState={setState} parks={parks} setParks={setParks}/>
        <div className="section">
          <Container>
            <ParksTable parks={parks}/>
          </Container>
          <h3 className="category">Gallery</h3>
          <ParksScroll/>
        </div>
      </div>
    </div>
  );
}

export default ParksPage;
