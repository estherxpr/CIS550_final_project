import React from "react";
import { Link } from "react-router-dom";
import states from "assets/img/states.jpg";
import parks from "assets/img/parks3.jpg";
import species from "assets/img/species.jpg";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";



function Tabs() {

  return (
      <div className="section section-tabs">
        <Container>
          <Row>
      
            <Col className="ml-auto mr-auto" md="10" xl="4">
            <Link to="/states">
              <p className="category">States</p>
              <Card>
                <CardBody>
                  <img src ={states} alt ="states"/>
                </CardBody>
              </Card>
              </Link>
            </Col>
       
            <Col className="ml-auto mr-auto" md="10" xl="4">
            <Link to="/parks">
              <p className="category">Parks</p>
              <Card>
                <CardBody>
                    <img src={parks} alt="states"/>
                </CardBody>
              </Card>
              </Link>
            </Col>

            <Col className="ml-auto mr-auto" md="10" xl="4">
            <Link to="/species">
              <p className="category">Species</p>

            <Card>
                <CardHeader>
     
                </CardHeader>
                <CardBody>
                  <img src = {species} alt="species"/>
             
                </CardBody>
              </Card>
              </Link>
                </Col>

          </Row>
        </Container>
      </div>
 
  );
}

export default Tabs;
