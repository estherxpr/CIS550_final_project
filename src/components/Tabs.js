import React from "react";
import states from "assets/img/states.jpg";
import parks from "assets/img/parks2.jpg";
import species from "assets/img/species.jpg";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

function Tabs() {

  return (
      <div className="section section-tabs">
        <Container>
          <Row>

            <Col className="ml-auto mr-auto" md="10" xl="4">
              <p className="category">States</p>
              <Card>
                <CardBody>
                  <img src ={states} alt ="states"/>
                </CardBody>
              </Card>
            </Col>

            <Col className="ml-auto mr-auto" md="10" xl="4">
              <p className="category">Parks</p>
              <Card>
                <CardBody>
                    <img src={parks} alt="states"/>
                </CardBody>
              </Card>
            </Col>

            <Col className="ml-auto mr-auto" md="10" xl="4">
              <p className="category">Species</p>

            <Card>
                <CardHeader>
     
                </CardHeader>
                <CardBody>
                  <img src = {species} alt="species"/>
             
                </CardBody>
              </Card>
                </Col>

          </Row>
        </Container>
      </div>
 
  );
}

export default Tabs;
