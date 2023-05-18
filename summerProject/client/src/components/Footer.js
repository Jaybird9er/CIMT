import React from "react";
import { Github } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer
      variant="dark"
      className=" myFooter navbar  py-3 fixed-bottom shadow-lg justify-content-center container-fluid ">
      {" "}
      Copyright &copy; 2022_summer_team4{" "}
      <a href="https://github.com/cis197-pcc/2022_summer_team4" target="_blank">
        <Github className="myIcon" width="100" height="30" />
      </a>
     
    </footer>
  );
};

export default Footer;
