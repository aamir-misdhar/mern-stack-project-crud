import React from "react";

import {Container, Row, Col} from "react-bootstrap";

function NotFound() {
    return (
      <Container>
        <Row className="mt-5 text-center">
          <Col>
          <h1 className="display-6">Page Not Fount</h1></Col>
        </Row>
      </Container>
    );
  }
  
  export default NotFound;