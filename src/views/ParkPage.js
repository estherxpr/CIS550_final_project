import React, { useEffect, useState, useRef } from "react";
// import parks from "assets/img/parks3.jpg";
// import ParksScroll from "components/ParksScroll";
import { useParams } from 'react-router-dom';
import { getPark } from "data/fetch";
import IndexNavbar from "components/Navbar.js";
// reactstrap components
import {
  Container,
  Col,
  Row,

  Card,
  CardBody,
} from "reactstrap";
import ParkPageHeader from "components/ParkHeader";

function ParkPage() {
    const parkName = useParams();
    const [park, setPark] = useState([]);
    const [imgSrc, setImgSrc] = useState([]);
    const firstRendering = useRef(true);
    const name = JSON.stringify(parkName.parkName).replace(/^"(.+(?="$))"$/, '$1');;
    
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getPark(name);
          setPark(data);
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
      async function fetchImg() {
        try {          
          const src = await require(`../assets/img/parks/${park.Code}.jpg`);
          setImgSrc(src);
        } catch (err) {
          // throw new Error(err.message);
        }
      }
      fetchImg();
    }, [park])

    return (
      <div>
        <IndexNavbar />
        <div className="wrapper">
          <ParkPageHeader {...parkName}/>
          <div className="section">
            <Container>
                <Row>
              <Col>
                <Card>
                    <CardBody>
                        <h3 className="title">{name}</h3>
                        <img src={imgSrc} alt={name} width = "500px" height="500px"></img>
                    </CardBody>
                </Card>
              </Col>
              <Col>
                <Card>
                    <CardBody>
                        <h4 className="text">Acre: {park.Acres}</h4>
                        <h4 className="text">State: {park.State}</h4>
                        <h4 className="text">Latitude: {park.Latitude}</h4>
                        <h4 className="text">Longitude: {park.Longitude}</h4>
                        <h4 className="text">Threatened by 3 fires</h4>
                        <h4 className="text">
                            Top 10 Species: 张旻政，张旻政，张旻政，张旻政，张旻政，张旻政，
                            张旻政，张旻政，张旻政，张旻政，张旻政，张旻政大傻逼来咬我吖儿砸
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
  