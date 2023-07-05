import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const App = () => {
  
    const logout =() =>{
        localStorage.removeItem("token"); //remove token after logging out
        localStorage.removeItem("loggedIn");
        window.location.href="/sign-in";//redirect to login page when user logs out    
    }
  
  
  
    return (
      <div className="opacity-topBar">
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/dashboard">PIZZA</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Button
                variant="danger"
                size="lg"
                onClick={logout}
                style={{ width: "110px" }}
              >
                Logout
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
};

export default App;
