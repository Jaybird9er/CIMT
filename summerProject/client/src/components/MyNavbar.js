import React, { useState, useEffect, useRef } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MyNavbar = () => {
  const [exit, setExit] = useState(false);
  const [username, setUsername] = useState(null);

  const onClickHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("displayName");
    setExit(true);
    setUsername(null);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [username]);

  return (
    <Navbar
      bg=""
      variant="dark"
      expand="lg"
      className="text-center shadow-lg py-4">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">CIMT</NavLink>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link>
              {" "}
              <NavLink to="resources">Add Available Resource</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="incidents"> Add Emergency Incident</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="search-resources">Search Resources Form</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="resource-report">Generate Resource Report</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="/login"> Login</NavLink>
            </Nav.Link>

            <Nav.Link onClick={onClickHandler}>
              <NavLink to="login">Exit</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
