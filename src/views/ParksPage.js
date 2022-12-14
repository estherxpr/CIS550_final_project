import React from "react";
import parks from "assets/img/parks3.jpg";
import ParksScroll from "components/ParksScroll";
import IndexNavbar from "components/Navbar.js";
// reactstrap components
import {

  Container,

  Table,
  Card,
  CardBody,
} from "reactstrap";

// core components
import ParksPageHeader from "components/ParksHeader.js";

function ParksPage() {
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
      <IndexNavbar />
      <div className="wrapper">
        <ParksPageHeader />
        <div className="section">
          <Container>
            {/* parks define by state */}
            <h3 className="title">Parks</h3>
            <Card>
              <CardBody>
                <div style={{
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  <Table bordered height="200">
                    <thead>
                      <tr>
                        <th scope="col">Park Code</th>
                        <th scope="col">Park Name</th>
                        <th scope="col">Most Abundant Species</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Container>
          <p className="category">Parks</p>
          <ParksScroll/>
        </div>
      </div>
    </div>
  );
}

export default ParksPage;
