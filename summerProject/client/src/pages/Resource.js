import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import axios from "../api";

import {
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const Resource = () => {
  const [functions, setFunctions] = useState([]);
  const [units, setUnits] = useState([]);
  const [resourceId, setResourceId] = useState("");
  const [selected, setSelected] = useState({ id: 1 });
  const [reload, setReload] = useState(null);
  const [secondary, setSecondary] = useState({});
  const [showText, setShowText] = useState(false);
  const [capabilities, setCapabilities] = useState([]);

  const refName = useRef(null);
  const refPf = useRef(null);
  const refSf = useRef(null);
  const refDescription = useRef(null);
  const refCapability = useRef(null);
  const refDistance = useRef(null);
  const refCost = useRef(null);
  const refUnit = useRef(null);

  const fitchFunctions = async () => {
    try {
      const response = await axios.get("/functions");
      setFunctions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fitchUnits = async () => {
    try {
      const response = await axios.get("/units");
      setUnits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fitchFunctions();
    fitchUnits();
  }, [reload]);

  const onClick = () => {
    window.location.reload(false);
    setReload((prev) => prev + 1);
    setResourceId("");
    setShowText(false);
    fitchFunctions();
    fitchUnits();
  };

  const displayName = localStorage.getItem("displayName");
  const username = localStorage.getItem("username");
  let navigate = useNavigate();
  const changePage = () => {
    navigate("/");
  };

  //selected pf:
  const handleChange = (e) => {
    setSelected(functions[e.target.value - 1]);
  };
  // console.log(`selected.id1 :${selected.id}`);

  const newPf = functions.filter((item) => item.id !== selected.id);

  const ChangeSecondary = (e) => {
    const { name, value } = e.target;
    if (e.target.value === selected.id) {
      setSecondary({});
    } else {
      setSecondary({ [name]: value });
    }
  };

  if (secondary.secondary == selected.id) {
    setSecondary({});
  }

  const onSubmitHandler = (e) => {
    if (!username) {
      navigate("/login");
    } else {
      e.preventDefault();
      const data = {
        name: refName.current.value,
        primaryFunction: refPf.current.value,
        secondaryFunction: secondary.secondary,
        description: refDescription.current.value,
        capabilities: capabilities,
        distance: refDistance.current.value,
        cost: refCost.current.value,
        username: username,
        unit: refUnit.current.value,
      };

      axios
        .post("/resources", data)
        .then((response) => {
          setResourceId(response.data.id);
          setShowText(true);
        })
        .catch((error) => {
          console.log(error);
        });
      e.target.reset();
      setReload(null);
      setCapabilities([]);
    }
  };

  const onAddHandler = () => {
    setCapabilities([...capabilities, refCapability.current.value]);
    refCapability.current.value = "";
  };

  return (
    <>
      <Container>
        <Form onSubmit={onSubmitHandler}>
          <Container>
            <Row className="mt-5 mb-5">
              <Col>
                <h3>New Resource Information</h3>
                {showText && (
                  <h4 style={{ margin: "2rem auto" }}>
                    Resource ID-{resourceId} Saved
                  </h4>
                )}
              </Col>

              <Col>
                <FaPlusCircle
                  style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  className="d-flex ms-auto me-5"
                  onClick={onClick}
                />
              </Col>
            </Row>
          </Container>

          <Form.Group className="mb-3" controlId="id">
            <Row>
              <Col sm>
                <Form.Label>ResourceID</Form.Label>{" "}
                <Form.Text className="text-muted ">
                  (assigned on save)
                </Form.Text>{" "}
              </Col>
              <Col>
                <Form.Control
                  className="darkMode"
                  name="resourceId"
                  type="text"
                  plaintext
                  readOnly
                  defaultValue={resourceId}
                  placeholder="*********"
                />
              </Col>{" "}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="owner">
            <Row>
              <Col>
                <Form.Label>Owner </Form.Label>{" "}
              </Col>
              <Col>
                <Form.Control
                  className="darkMode"
                  plaintext
                  readOnly
                  defaultValue={displayName}
                />
              </Col>{" "}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic1">
            <Row>
              <Col>
                <Form.Label>
                  Resource Name<span style={{ color: "red" }}>*</span>{" "}
                </Form.Label>{" "}
              </Col>
              <Col>
                <Form.Control
                  autoComplete="off"
                  style={{ backgroundColor: "#d4c9df" }}
                  type="text"
                  required
                  name="resourceName"
                  ref={refName}
                />
              </Col>{" "}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic2">
            <Row>
              <Col>
                <Form.Label>Primary Function</Form.Label>{" "}
              </Col>
              <Col>
                <Form.Select
                  type="select"
                  required
                  name="primary"
                  ref={refPf}
                  onChange={handleChange}>
                  {functions.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.description}
                      </option>
                    );
                  })}
                  {/* <option value>select </option> */}
                </Form.Select>
              </Col>{" "}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic3">
            <Row>
              <Col>
                <Form.Label>Secondary Function</Form.Label>{" "}
              </Col>
              <Col>
                {newPf.map((i) => {
                  return (
                    <Form.Check
                      key={i.id}
                      type="radio"
                      label={i.description}
                      name="secondary"
                      value={i.id}
                      // ref={refSf}
                      // checked={secondary === i.id}
                      onChange={ChangeSecondary}
                    />
                  );
                })}
              </Col>{" "}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic4">
            <Row>
              <Col>
                <Form.Label>Description </Form.Label>{" "}
                <Form.Text className="text-muted">(optional)</Form.Text>{" "}
              </Col>
              <Col>
                <Form.Control
                  autoComplete="off"
                  style={{ backgroundColor: "#d4c9df" }}
                  type="text"
                  name="description"
                  ref={refDescription}
                />{" "}
              </Col>{" "}
            </Row>
          </Form.Group>
          {/* Capabilities is an optional field. The list view dynamically expands as the user enters a new capability.   */}
          <Form.Group className="mb-3" controlId="formBasic5">
            <Row>
              <Col>
                <Form.Label>Capabilities </Form.Label>{" "}
                <Form.Text name="formBasic4" className="text-muted">
                  (optional)
                </Form.Text>{" "}
              </Col>
              <Col>
                <FormControl
                  autoComplete="off"
                  style={{ backgroundColor: "#d4c9df" }}
                  as="textarea"
                  rows="1"
                  name="capability"
                  ref={refCapability}></FormControl>
                {capabilities.map((cap) => {
                  return cap !== "" ? <div>{cap} - added</div> : "";
                })}

                <Button
                  onClick={onAddHandler}
                  className="ps-4 pe-4 d-flex ms-auto shadow-lg"
                  size="sm"
                  variant="primary"
                  id="button-addon2">
                  Add
                </Button>
              </Col>{" "}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic6">
            <Row>
              <Col xs="auto" className="my-1 flex-fill">
                <Form.Label>Distance from PCC </Form.Label>{" "}
                <Form.Text className="text-muted">(optional)</Form.Text>{" "}
              </Col>
              <Col xs="auto" className="my-1 flex-fill">
                <InputGroup className="mb-3">
                  <FormControl
                    autoComplete="off"
                    style={{ backgroundColor: "#d4c9df" }}
                    type="number"
                    step="0.1"
                    min="0"
                    name="distance"
                    ref={refDistance}
                  />
                  <InputGroup.Text>miles</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>{" "}
          </Form.Group>

          <Form.Group className="" controlId="form7">
            <Row>
              <Col xs="auto" className="my-1 flex-fill">
                <Form.Label>Cost </Form.Label>{" "}
                <Form.Text className="text-muted">(USD)</Form.Text>{" "}
              </Col>

              <Col xs="auto" className="my-1 flex-fill">
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    $<span style={{ color: "red" }}>* </span>
                  </InputGroup.Text>{" "}
                  <FormControl
                    autoComplete="off"
                    style={{ backgroundColor: "#d4c9df" }}
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    name="cost"
                    ref={refCost}
                  />
                </InputGroup>
              </Col>

              <Col xs="auto" className="my-1 flex-fill">
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    Per<span style={{ color: "red" }}>* </span>{" "}
                  </InputGroup.Text>{" "}
                  <Form.Select type="select" required name="unit" ref={refUnit}>
                    {units.map((unit) => {
                      return (
                        <option key={unit.id} value={unit.id}>
                          {unit.typeName}
                        </option>
                      );
                    })}{" "}
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>{" "}
          </Form.Group>

          <Row>
            <Col></Col>
            <Col>
              <Button
                onClick={changePage}
                className="m-5 ps-3 pe-3 pb-2 shadow-lg"
                variant="secondary"
                type="submit">
                Cancel
              </Button>
              <Button
                className=" m-5 pe-4 ps-4 pb-2 shadow-lg"
                variant="primary"
                type="submit">
                Save
              </Button>
            </Col>{" "}
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default Resource;
