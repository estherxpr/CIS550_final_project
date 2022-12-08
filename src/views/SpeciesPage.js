import React from "react";
import species from "assets/img/species.jpg";
// reactstrap components
import {
  Container,
  CardHeader,
  Table,
  Card,
  CardBody,
} from "reactstrap";

// core components
import SpeciesHeader from "components/SpeciesHeader.js";

function SpeciesPage() {
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
      <div className="wrapper">
        <SpeciesHeader />
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
                        <th scope="col">Common Name</th>
                        <th scope="col">Park Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Order</th>
                        <th scope="col">Family</th>
                        <th scope="col">Occurence</th>
                        <th scope="col">Nativeness</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
        <p className="category">Species</p>

        <Card>
          <CardHeader>

          </CardHeader>
          <CardBody>
            <img src={species} alt="species" />

          </CardBody>
        </Card>
      </div>
    </div >
  );
}

export default SpeciesPage;
