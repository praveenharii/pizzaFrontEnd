import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function Topbar() {

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-end">
      <Navbar.Brand href="#">Pizza</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Sign-in</Nav.Link>
        <Nav.Link href="/sign-up">Sign-Up</Nav.Link>
      </Nav>

    </Navbar>
  );
}
