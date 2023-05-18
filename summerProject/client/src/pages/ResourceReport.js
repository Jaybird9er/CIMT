import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaInfo } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import axios from "../api/axios";
import axios from "../api";
import { Container, Table } from "react-bootstrap";

const ResourceReport = () => {
  const username = localStorage.getItem("username");
  const url = `/resources/${username}`;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get(url);
      setLoading(false);

      if (response.data.code === "ER_BAD_FIELD_ERROR") {
        setError(true);
        setLoading(false);
      } else {
        setItems(response.data.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Container>
        <h3 className=" d-flex mb-5 mt-5">
          Resource Report <FaInfo className="d-flex me-5 ms-auto" />{" "}
        </h3>
        {error && <h4>no data found</h4>}

        {!error && (
          <>
            {" "}
            {loading ? (
              <h3 className="text-center">
                {" "}
                <AiOutlineLoading3Quarters> </AiOutlineLoading3Quarters>{" "}
                Loading...
              </h3>
            ) : (
              <Table className="darkMode table-dark" striped bordered hover>
                <thead>
                  {" "}
                  <tr>
                    <th>Primary Function #</th>
                    <th>Primary Function</th>
                    <th>Total Resources</th>
                  </tr>
                  </thead>
                  
                <tbody>
                  {items.map((item) => {
                    return (
                      <>
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.description}</td>
                          <td>{item.count}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
                <thead>
                  <tr>
                    <td></td>
                    <td>
                      <span style={{ fontWeight: "bold" }}>Total</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        {items
                          .map((item) => item.count)
                          .reduce((prev, curr) => prev + curr, 0)}
                      </span>
                    </td>
                  </tr>
                </thead>
              </Table>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ResourceReport;
