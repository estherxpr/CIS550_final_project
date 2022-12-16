import { Link } from "react-router-dom";
import { getUrlName } from "..//data/fetch"
import React, { useEffect, useState, useRef } from "react";
import species_all from "assets/img/species.jpg";
import species_all2 from "assets/img/species2.jpg";
import { useParams } from 'react-router-dom';
import { getPark } from "data/fetch";
import { getSpeciesByName } from "../data/fetch";
import { getDisName } from "../data/fetch";
import IndexNavbar from "components/Navbar.js";
import { Carousel } from 'react-responsive-carousel';
// reactstrap components
import {
    Container,
    Table,
    Card,
    CardBody,
    Row,
    Col,
} from "reactstrap";

// core components
import SpeciesPageHeader from "components/SpeciesHeader.js";



function SpeciesPage() {
    const scientificName = useParams();
    const [urls, setUrl] = useState([]);
    const [dis, setDis] = useState([]);
    const [imgSrc, setImgSrc] = useState([]);
    // const [commonNames, setCommonNames] = useState("");
    // const [genus, setGenus] = useState("");
    // const [order, setOrder] = useState("");
    // const [family, setFamily] = useState("");


    const name = JSON.stringify(scientificName.speciesName).replace(/^"(.+(?="$))"$/, '$1');
    const [species, setSpecies] = useState([]);
    const firstRendering = useRef(true);

    const name3 = 'A'
   
  
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getSpeciesByName(name);
                setSpecies(data);
                const distribution = await getDisName(name);
                setDis(distribution);
                
                const url_s = await getUrlName(name);
                if (url_s && url_s.length >= 1 && url_s[0].url && url_s[0].url.length >= 1) {
                    setUrl(url_s[0].url);
                } 
                
            } catch (err) {
                throw new Error(err.message);
            }
        }
        if (firstRendering.current) {
            firstRendering.current = false;
            fetchData();
        }
    })
  
    

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

    let orderRow = null;
    if (dis.length > 0) {
        orderRow = dis.map((dis) => {
            return (
                <tr >
                    <td><Link to={`/parks/${dis.Park_Name}`} >{dis.Park_Name}</Link></td>
                    <td>{dis.Nativeness}</td>
                    <td>{dis.Occurrence}</td>
                    <td>{dis.Seasonality}</td>
                    <td>{dis.Conservation_Status}</td>
                </tr>
            );
        });
    }
    return (
        <div>
            <IndexNavbar />
            <div className="wrapper">
                <SpeciesPageHeader />
                <div className="section">
                    <Container>
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <h3 className="title">{name}</h3>
                                        {urls.length > 0 ? <img src={urls[0]} alt={name} width="350px" height="300px"></img> : <p className="category">No image found</p>}
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <h4 className="text">Common name:   {species.common_names}</h4>
                                        <h4 className="text">Genus:         {species.genus}</h4>
                                        <h4 className="text">Family:        {species.family}</h4>
                                        <h4 className="text">Order:         {species.SpeciesOrder}</h4>
                                        <h4 className="text">Category:      {species.category}</h4>
                                        <h4 className="text">Conservation:  {species.Conservation_Status}</h4>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        {/* Species define by state */}
                        <h3 className="title">Distribution in national parks</h3>
                        <Card>
                            <CardBody>
                                <div style={{
                                    maxHeight: '300px',
                                    overflowY: 'auto'
                                }}>
                                    <Table bordered height="200">
                                        <tbody>
                                           
                                          
                                            <tr>
                                                <th scope="col">National park</th>
                                                <th scope="col">Nativeness</th>
                                                <th scope="col">Occurence</th>
                                                <th scope="col">Seasonality</th>
                                                <th scope="col">Abundance</th>
                                            </tr>
                               

                                            {dis.map(row => (
                                                <tr key={dis.Park_Name + dis.Occurrence}>
                                                    <td><Link to={`/parks/${dis.Park_Name}`} >{row.Park_Name}</Link></td>
                                                        <td>{row.Nativeness}</td>
                                                        <td>{row.Occurrence}</td>
                                                        <td>{row.Seasonality}</td>
                                                        <td>{row.Abundance}</td>
                        
                                                </tr>
                                            ))}
                                            {/* }
                                            {dis.map((row, index) => {                            
                                                return (
                                                    <tr>
                                                        <td><Link to={`/parks/${dis.Park_Name}`} >{row.Park_Name}</Link></td>
                                                        <td>{row.Nativeness}</td>
                                                        <td>{row.Occurrence}</td>
                                                        <td>{row.Seasonality}</td>
                                                        <td>{row.Conservation_Status}</td>
                                                    </tr>
                                                );
                                            })}
                                            {*/ }
                                       
                                        </tbody>
                                     </Table>
                                </div>
                            </CardBody>
                        </Card>
                
                    </Container>

                    <p className="category">Species Images</p>

                    <Row className="align-items-center">
                        <Carousel
                            key={urls.length}
                            showStatus={false}
                            infiniteLoop={true}
                            autoPlay={true}
                            showThumbs={false}
                            showArrows = {true}
                            showIndicators = {true}
                            interval = {2500}
                            centerMode = {true}
                            centerSlidePercentage = {30}
                          >
                        <Col>
                            <Card>
                                <CardBody>
                                    <img src={urls[1]} width={400} height={400} alt="states" />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <img src={urls[2]} width={400} height={400} alt="states" />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <img src={urls[3]} width={400} height={400} alt="states" />
                                </CardBody>
                            </Card>
                        </Col>
                        </Carousel>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default SpeciesPage;
