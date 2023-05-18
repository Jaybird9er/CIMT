import React from "react";
import {  Outlet } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <MyNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
