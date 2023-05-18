import React, { useState, useEffect } from "react";
import { Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import axios from "../api/axios";
import axios from "../api";

const MainMenu = () => {
  const [alert, setAlert] = useState(false);
  const [display, setDisplay] = useState("display");

  const username = localStorage.getItem("username");
  const displayName = localStorage.getItem("displayName");

  useEffect(() => {
    if (username) {
      setAlert(true);
    }
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const fitchUser = async () => {
    const response = await axios.get(`/users/${username}`);



    if (response.data.Admin) {
      setDisplay(response.data.Admin.email);
    } else if (response.data.Provider) {
      setDisplay(response.data.Provider.address);
    } else if (response.data.CimtUser) {
      setDisplay(response.data.CimtUser.phone);
    } else {
      setDisplay("Error");
    }
  };

  useEffect(() => {
    fitchUser();
  }, []);

  let navigate = useNavigate();
  const changePage = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("displayName");
    navigate("login");
  };

  return (
    <>
      <Container>
        {alert && (
          <Alert variant="success">
            {" "}
            &nbsp;
            <IoIosCheckmarkCircleOutline /> &nbsp;You are now logged in{" "}
          </Alert>
        )}
      </Container>

      <Container className="fluid">
        {" "}
        <Container className="my-5">
          <Row className="d-flex ">
            <Col>
              <h1>CIMT</h1>
            </Col>
            <Col>
              <h3 className="d-flex ms-auto justify-content-end">
                {displayName}
              </h3>
              <p className="d-flex ms-auto justify-content-end">{display}</p>
            </Col>
          </Row>

          <Row className="mt-5 mb-5 text-center">
            <h3>Main Menu</h3>

            <Link className="navLink" to="resources">
              Add Available Resource
            </Link>
            <Link className="navLink" to="incidents">
              {" "}
              Add Emergency Incident
            </Link>
            <Link className="navLink" to="search-resources">
              Search Resources
            </Link>
            <Link className="navLink" to="resource-report">
              Generate Resource Report
            </Link>
          </Row>
        </Container>
        <Button
          onClick={changePage}
          className="d-flex ms-auto ps-5 pe-5 mb-5 shadow-lg"
          variant="secondary">
          Exit
        </Button>
      </Container>
    </>
  );
};

export default MainMenu;
