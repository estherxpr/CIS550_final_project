import React from "react";

// reactstrap components
import {

  Container,

  Table,
  Card,
  CardBody,
} from "reactstrap";

// core components
import ProfilePageHeader from "components/StatesHeader.js";

function State() {
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
        <ProfilePageHeader />
        <div className="section">

          <Container>
            {/* parks define by state */}
            <h3 className="title">Parks</h3>
            <Table bordered height="200">
              <thead>
                <tr>
                  <th scope="col">Park Code</th>
                  <th scope="col">Park Name</th>
                  <th scope="col">Number of Species</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </Table>
            <h3 className="title">Species Order Distribution</h3>
            <Card>
              <CardBody>
                <div style={{
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  <Table bordered height="200">
                    <thead>
                      <tr>
                        <th>Species' Order</th>
                        <th>Park Name</th>
                        <th>Number of Species</th>
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
      </div>
    </div>
  );
}

export default State;
