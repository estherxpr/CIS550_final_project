
import React from "react";

import { Container } from "reactstrap";
import homepage from "assets/img/homepage.jpg";
function Header() {


  return (
    <div>
      <div className="page-header clear-filter" >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + homepage + ")"
          }}
        ></div>
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">National Parks & species</h1>
          </div>
          <h6 className="category category-absolute">
            Designed by Peiran, Xiangchen, Zijian and Minzheng
          </h6>
        </Container>
      </div>
    </div>
  );
}

export default Header;
