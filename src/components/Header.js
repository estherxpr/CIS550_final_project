
import React from "react";

import { Container } from "reactstrap";

function IndexHeader() {


  return (
    <>
      <div className="page-header clear-filter" >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/homepage.jpg") + ")"
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
    </>
  );
}

export default IndexHeader;
