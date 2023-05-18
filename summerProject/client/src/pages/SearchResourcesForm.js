import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import axios from "../api/axios";
import axios from "../api";
import SearchResourcesResults from "./SearchResourcesResults";

import {
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const SearchResourcesForm = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(null);
  const [searchItems, setSearchItems] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [distance, setDistance] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/functions");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const onClick = () => {
    setKeyword("");
    setItems([]);
    setSelected(null);
    setDistance("");
    fetchItems();
    setShowResults(false);
  };

  let navigate = useNavigate();
  const changePage = () => {
    navigate("/");
  };

  //search resources results:
  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/resources/search?resourceName=${keyword}&description=${keyword}&capability=${keyword}&distance=${distance}&primaryFunction=${selected}`
      );
      setSearchItems(response.data);
      setLoading(false);
      setKeyword("");
      setItems([]);
      setSelected(null);
      setDistance("");
      fetchItems();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const onSearch = () => {
    const username = localStorage.getItem("username");
    if (username) {
      fetchResults();
      setShowResults(true);
    } else {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <Container>
        <Row className="mt-5 mb-5 d-flex sticky-top">
          <Col>
            <h3>Search Resources</h3>
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

      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="keyword">
            <Row>
              <Col sm>
                <Form.Label>Keyword </Form.Label>{" "}
                <Form.Text className="text-muted ">(optional)</Form.Text>{" "}
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  name="keyword"
                  value={keyword}
                  placeholder="Enter keyword"
                  onChange={(e) => setKeyword(e.target.value)}
                  autoComplete="off"
                  style={{ backgroundColor: "#d4c9df" }}
                />
              </Col>{" "}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="pf">
            <Row>
              <Col>
                <Form.Label>Primary Function</Form.Label>{" "}
                <Form.Text className="text-muted ">(optional)</Form.Text>{" "}
              </Col>
              <Col>
                <Form.Select
                  type="select"
                  onChange={handleChange}
                  name="primaryFunction"
                  value={selected}>
                  <option> </option>
                  {items.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.description}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>{" "}
            </Row>
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="incident">
            <Row>
              <Col>
                <Form.Label>Incident</Form.Label>{" "}
                <Form.Text className="text-muted ">(optional)</Form.Text>{" "}
              </Col>
              <Col>
                <Form.Select type="select">
                  <option value="">Please Select Incident</option>
                
                </Form.Select>
              </Col>{" "}
            </Row>
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="distance">
            <Row>
              <Col xs="auto" className="my-1 flex-fill">
                <Form.Label>Distance </Form.Label>{" "}
                <Form.Text className="text-muted">(optional)</Form.Text>{" "}
              </Col>
              <Col xs="auto" className="my-1 flex-fill">
                <InputGroup className="mb-3">
                  <InputGroup.Text>Within</InputGroup.Text>
                  <FormControl
                    onChange={(e) => setDistance(e.target.value)}
                    name="distance"
                    value={distance}
                    type="number"
                    min="0"
                    step="0.1"
                    autoComplete="off"
                    style={{ backgroundColor: "#d4c9df" }}
                  />
                  <InputGroup.Text>miles of PCC</InputGroup.Text>
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
                onClick={onSearch}
                className="m-5 pe-4 ps-4 pb-2 shadow-lg"
                variant="primary"
                type="button">
                Search
              </Button>
            </Col>{" "}
          </Row>
        </Form>
      </Container>
      <Container>
        {" "}
        {loading && (
          <h3>
            {" "}
            <AiOutlineLoading3Quarters /> Loading...
          </h3>
        )}
      </Container>

      {showResults && <SearchResourcesResults searchItems={searchItems} />}
      <Container>
        {" "}
        {error && <p className="mt-5">No results found</p>}
      </Container>
    </>
  );
};

export default SearchResourcesForm;
