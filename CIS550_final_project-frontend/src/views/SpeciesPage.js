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
    const [species, setSpecies] = useState({});
    const firstRendering = useRef(true);


   
  
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getSpeciesByName(name);
                if (data && data.length > 0){
                    setSpecies(data[0]);
                }
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
                                        <h4 className="text">Common name:   {species.Common_Names}</h4>
                                        <h4 className="text">Genus:         {species.Genus}</h4>
                                        <h4 className="text">Family:        {species.Family}</h4>
                                        <h4 className="text">Order:         {species.SpeciesOrder}</h4>
                                        <h4 className="text">Category:      {species.Category}</h4>
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
                                                <tr key={row.Park_Name + row.Occurrence}>
                                                    <td><Link to={`/parks/${row.Park_Name}`} >{row.Park_Name}</Link></td>
                                                        <td>{row.Nativeness}</td>
                                                        <td>{row.Occurrence}</td>
                                                        <td>{row.Seasonality}</td>
                                                        <td>{row.Abundance}</td>
                        
                                                </tr>
                                            ))}
                                       
                                        </tbody>
                                     </Table>
                                </div>
                            </CardBody>
                        </Card>
                
                    </Container>

                    <p className="category">Species Images</p>

                    <Row className="align-items-center">
                        { urls && urls.length > 0 ?<Carousel
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
                        
                        {urls.map((url, index) => {
                            return(
                                <Col key = {index}>
                                <Card>
                                    <CardBody>
                                        <img src={url} width={400} height={400} alt="states" />
                                    </CardBody>
                                </Card>
                                    </Col>
                            )
                        })}
                        </Carousel> : null}
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default SpeciesPage;
