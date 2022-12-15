/*eslint-disable*/
import React from "react";


import { Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://www.creative-tim.com?ref=nukr-dark-footer"
                target="_blank"
              >
                CIS550 Project 
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © 2022, Built By Group 39 
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
