import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  
    const logout =() =>{
        localStorage.removeItem("token"); //remove token after logging out
        localStorage.removeItem("loggedIn");
        window.location.href="/sign-in";//redirect to login page when user logs out
        
    }
  
  
  
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">WebSiteName</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Page 1</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={logout} className="text-danger">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    );
};

export default App;
