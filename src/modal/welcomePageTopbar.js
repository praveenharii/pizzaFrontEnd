import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function TextLinkExample() {
  return (
    <div className="opacity-topBar">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Pizza Website</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/sign-in">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TextLinkExample;
