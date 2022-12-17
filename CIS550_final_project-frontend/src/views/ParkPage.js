import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { getPark, getFiresByPark, getFeaturedSpeciesByParkName } from "../data/fetch";
import IndexNavbar from "components/Navbar.js";
import { Carousel } from 'react-responsive-carousel';

import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import ParkPageHeader from "../components/ParkHeader";

function ParkPage() {
    const parkName = useParams();
    const [park, setPark] = useState([]);
    const [imgSrc1, setImgSrc1] = useState([]);
    const [imgSrc2, setImgSrc2] = useState([]);
    const [imgSrc3, setImgSrc3] = useState([]);
    const [fires, setFires] = useState([]);
    const [featuredSpecies, setFeaturedSpecies] = useState([]);
    const firstRendering = useRef(true);
    const name  = useRef(JSON.stringify(parkName.parkName).replace(/^"(.+(?="$))"$/, '$1'));
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getPark(name.current);
          setPark(data);
          name.current = data.Name;
        } catch (err) {
          throw new Error(err.message);
        }
      }
      if (firstRendering.current) {
        firstRendering.current = false;
        fetchData();
      }
    })

    useEffect(() => {
      async function fetchData() {
        try {          
          const src1 = await require(`../assets/img/parkDetails/${park.Code}/1.jpg`);
          const src2 = await require(`../assets/img/parkDetails/${park.Code}/2.jpg`);
          const src3 = await require(`../assets/img/parkDetails/${park.Code}/3.jpg`);
          setImgSrc1(src1);
          setImgSrc2(src2);
          setImgSrc3(src3);
        } catch (err) {
          // throw new Error(err.message);
        }
      }
      fetchData();
    }, [park])

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getFiresByPark(name.current);
          setFires(data);
        } catch (err) {
          // throw new Error(err.message);
        }
      }
      fetchData();
    }, [park])

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getFeaturedSpeciesByParkName(name.current, 10);
          setFeaturedSpecies(data);
        } catch (err) {
          throw new Error(err.message);
        }
      }
      fetchData();
    }, [park])

    let featuredSpeciesStr = "";
    for (let i = 0; i < featuredSpecies.length; i += 1) {
      featuredSpeciesStr += featuredSpecies[i].name;
      if (i < featuredSpecies.length - 1) featuredSpeciesStr += ", ";
    }

    return (
      <div>
        <IndexNavbar />
        <div className="wrapper">
          <ParkPageHeader  parkName = {name.current}/>
          <div className="section">
            <Container>
                <Row>
              <Col>
                <Card>
                    <CardBody>
                        <h3 className="title">{name.current}</h3>
                        <Carousel
                            key={park.Code}
                            showStatus={false}
                            infiniteLoop={true}
                            autoPlay={true}
                            showThumbs={false}
                            showArrows = {true}
                            showIndicators = {true}
                            interval = {2500}
                          >
                            <img src={imgSrc1} alt={name.current} width = "500px" height="450px" />
                            <img src={imgSrc2} alt={name.current} width = "500px" height="450px" />
                            <img src={imgSrc3} alt={name.current} width = "500px" height="450px" />
                        </Carousel>
                    </CardBody>
                </Card>
              </Col>
              <Col>
                <Card>
                    <CardBody>
                        <h4 className="text">Acres: {park.Acres}</h4>
                        <h4 className="text">State: {park.State}</h4>
                        <h4 className="text">Latitude: {park.Latitude}</h4>
                        <h4 className="text">Longitude: {park.Longitude}</h4>
                        <h4 className="text">Threatened by {fires.length} fires</h4>
                        <h4 className="text">
                            Featured Species: {featuredSpeciesStr}
                            </h4>
                    </CardBody>
                </Card>
              </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
  
  export default ParkPage;
  