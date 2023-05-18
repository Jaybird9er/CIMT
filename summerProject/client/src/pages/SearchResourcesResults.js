import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "../api/axios";

const SearchResourcesResults = ({ searchItems }) => {
  return (
    <>
      <Container>
        <h3 className="mt-5 mb-5">Search Resources</h3>
        <Container>
          <Table className="darkMode table-dark" striped bordered hover>
            <thead>
              {" "}
              <tr>
                <th>Resource ID</th>
                <th>Resource Name</th>
                <th>Owner</th>
                <th>Cost/Unit</th>
                <th>Distance</th>
              </tr>
            </thead>
            {searchItems.length === 0 && <h3>No results found</h3>}
            <tbody>
              {searchItems.map((item) => (
                <tr className="darkMode">
                  <td>{item.id}</td>
                  <td>{item.resourceName}</td>
                  <td>{item.User.displayName}</td>
                  <td>
                    {item.cost}/{item.Unit.typeName}
                  </td>
                  <td>{(item.distance==='0.0') ? '' : item.distance}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Container>
    </>
  );
};

export default SearchResourcesResults;
