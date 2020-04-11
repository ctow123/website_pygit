/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>

          <div className="copyright" id="copyright">
            {new Date().getFullYear()}, Designed by{" "}

            Originally Coded by{" "}
            <a
              href="https://www.creative-tim.com?ref=nukr-default-footer"
              target="_blank"
            >
              Creative Tim{" "}
            </a>
             Source code modified by me for my use.
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
