import React from "react";
import species_all from "assets/img/species.jpg";
import species_all2 from "assets/img/species2.jpg";
import IndexNavbar from "components/Navbar.js";
// reactstrap components
import {
    Container,
    Table,
    Card,
    CardBody,
} from "reactstrap";

// core components
import SpeciesPageHeader from "components/SpeciesHeader.js";

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
            <IndexNavbar />
            <div className="wrapper">
                <SpeciesPageHeader />
                <div className="section">
                    <Container>
                        {/* Species define by state */}
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
                                                <th scope="col">Scientific name</th>
                                                <th scope="col">Common name</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Order</th>
                                                <th scope="col">Family</th>
                                                <th scope="col">Endangered</th>
                                                <th scope="col">Involved in International Trade</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Container>
                    <p className="category">Species Images</p>
                    <Card style={{ width: '17.5em' }}>
                        <CardBody>
                            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Abaeis_nicippe1.jpg/252px-Abaeis_nicippe1.jpg"} width={250} height={250} alt="states" />
                        </CardBody>
                    </Card>
                    <Card style={{ width: '17.5rem' }}>
                        <CardBody>
                            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Eurema_nicippe_8zz.jpg/227px-Eurema_nicippe_8zz.jpg"} width={250} height={250} alt="states" />
                        </CardBody>
                    </Card>
                    <Card style={{ width: '17.5rem' }}>
                        <CardBody>
                            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Abaeis_nicippe_P1120349a.jpg/220px-Abaeis_nicippe_P1120349a.jpg"} width={250} height={250} alt="states" />
                        </CardBody>
                    </Card>
                    <Card style={{ width: '17.5rem' }}>
                        <CardBody>
                            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Abaeis_nicippe_P1120347a.jpg/248px-Abaeis_nicippe_P1120347a.jpg"} width={250} height={250} alt="states" />
                        </CardBody>
                    </Card>

                </div>
            </div>
        </div>
    );
}

export default SpeciesPage;
