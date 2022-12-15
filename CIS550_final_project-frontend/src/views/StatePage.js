import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import IndexNavbar from "components/Navbar.js";
// reactstrap components
import {
  Container,
  Table,
  Card,
  CardBody,
} from "reactstrap";
import { getSpeciesDistributionByState, searchSpecies } from "data/fetch";
// core components
import StatePageHeader from "components/StatesHeader.js";


function ParksTable({parks}){
  let parksRow = null;
  if (parks.length > 0) {
    parksRow = parks.map((park) => {
      return (
        <tr key={park.parkName}>
          <td><Link to = {`/parks/${park.parkCode}`} >{park.parkCode}</Link></td>
          <td><Link to = {`/parks/${park.parkCode}`} >{park.parkName}</Link></td>
          <td>{park.speciesNumber}</td>
        </tr>
      );
    });
  }
  return (
    <div>
    <h3 className="title">Parks</h3>
    <Table bordered height="200">
      <thead>
        <tr>
          <th scope="col">Park Code</th>
          <th scope="col">Park Name</th>
          <th scope="col">Number of Species</th>
        </tr>
      </thead>
      <tbody>
        {parksRow}
      </tbody>
    </Table>
    </div>
  )
}




function DistributionTable({state}){
  const [orderDistribution, setOrderDistribution] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const query = {keyword: "orderDistribution", state};
        const res = await searchSpecies(query);
        setOrderDistribution(res);
        }catch(err){
          console.log(err);
        }
      }
    
    if(state && state !== ""){
      fetchData();
    }
  },[state]);


  let orderRow = null;  
  if (orderDistribution.length > 0) {
    orderRow = orderDistribution.map((order) => {
      return (
        <tr key={order.SpeciesOrder + order.Park_Name}>
          <td>{order.SpeciesOrder}</td>
          <td><Link to = {`parks/${order.Park_Name}`} >{order.Park_Name}</Link></td>
          <td>{order.NUM}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h3 className="title">Species Order Distribution</h3>
        <Card>
          <CardBody>
            <div style={{
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              <Table bordered height="200">
                <thead>
                  <tr>
                    <th>Species' Order</th>
                    <th>Park Name</th>
                    <th>Number of Species</th>
                  </tr>
                </thead>
                <tbody>
                  {orderRow}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
    </div>
  )
}






function StatePage() {
  const [state, setState] = useState("");
  const [parks, setParks] = useState([]);

  useEffect(() => {
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
        const res = await getSpeciesDistributionByState(state);
        // const res2 = await searchSpecies({keyword: "aboundanceByState", state});
        // console.log(res2);
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
        <StatePageHeader state={state} setState={setState} />
        <div className="section">
          <Container>
            <ParksTable parks={parks}/>
            <DistributionTable state={state}/>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default StatePage;
