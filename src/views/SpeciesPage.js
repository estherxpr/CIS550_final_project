import React from "react";
import species_all from "assets/img/animal_collage.jpg";
import ParksScroll from "components/ParksScroll";
import { useParams } from 'react-router-dom';
// reactstrap components
import {
  Container,
  Col,
  Row,
  Table,
  Card,
  CardBody,
} from "reactstrap";
import ParkPageHeader from "components/ParkHeader";

function SpeciesPage() {
    const speciesName = useParams();
	var sp_img1 = new Image();
	sp_img1.src =
	var sp_img2 = new Image();
	sp_img2.src =
	var sp_img3 = new Image();
	sp_img3.src = 
    const name = JSON.stringify(speciesName.speciesName).replace(/^"(.+(?="$))"$/, '$1');;
    React.useEffect(() => {
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
  
    return (
      <div>
        <div className="wrapper">
          <ParkPageHeader {...speciesName}/>
          <div className="section">
            <Container>
                <Row>
              <Col>
                <Card>
                    <CardBody>
                        <h3 className="title">{name}</h3>
						<img src={sp_img1}></img>
                        <img src={sp_img2}></img>
						<img src={sp_img3}></img>
                    </CardBody>
                </Card>
              </Col>
              <Col>
                <Card>
                    <CardBody>
                        <h4 className="text">Common name: 47390</h4>
                        <h4 className="text">Family: ME</h4>
						<h4 className="text">Order: 44.35</h4>
                        <h4 className="text">category: 44.35</h4>
                        <h4 className="text">Conservation Status: -68.21</h4>
                        <h4 className="text">Appeared in by 3 fires</h4>
                        <h4 className="text">
                           Trade records: imported from Africa
                            </h4>
                    </CardBody>
                </Card>
				<Card>
                    <CardBody> // species in certain park 
						<h4 className="text">Park Name: 47390</h4>
                        <h4 className="text">Abundance in the Park: 47390</h4>
                        <h4 className="text">Nativeness: ME</h4>
						<h4 className="text">Seasonality: 44.35</h4>
                        <h4 className="text">
                           fire threaten: fire record numbers // same as fire in parkpage
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
  