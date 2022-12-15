import React,{useEffect,useState} from "react";
// import species from "assets/img/species.jpg";
import IndexNavbar from "components/Navbar.js";
// reactstrap components
import {
  Container,
  Table,
  Card,
  CardBody,
} from "reactstrap";

// core components
import SpeciesAllHeader from "components/SpeciesAllHeader.js";


function SpeciesTable(props){
  const {speciesData} = props;
  let speciesRow = null;
  if (speciesData && speciesData.length > 0) {
    speciesRow = speciesData.map((species) => {
      return (
        <tr key={species.scientifc_Name}>
          <td>{species.scientificName}</td>
          <td>{species.commonName}</td>
          {/* <td>{species.category}</td>
          <td>{species.order}</td>
          <td>{species.family}</td>
          <td>{species.occurence}</td>
          <td>{species.nativeness}</td> */}
        </tr>
      );
    });
  }
  return (
    <div className="section">
    <Container>
      <h3 className="title">Species</h3>
      <Card>
        <CardBody>
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <Table bordered height="200">
              <thead>
                <tr>
                  <th scope="col">Scientific Name</th>
                  <th scope="col">Common Name</th>
                  {/* <th scope="col">Park Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Order</th>
                  <th scope="col">Family</th>
                  <th scope="col">Occurence</th>
                  <th scope="col">Nativeness</th> */}
                </tr>
              </thead>
              <tbody>
                {speciesRow}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </Container>
    </div>
  )
}


function SpeciesAllPage() {
  const [speciesData, setSpeciesData] = React.useState([]);
  React.useEffect(() => {
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

  

  return (
    <div>
      <IndexNavbar />
      <div className="wrapper">
        <SpeciesAllHeader setSpeciesData = {setSpeciesData}/>
        <SpeciesTable speciesData = {speciesData}/>
        </div>
        <p className="category">Species</p>
      </div>
  );
}

export default SpeciesAllPage;
