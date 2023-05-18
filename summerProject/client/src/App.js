import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import Resource from "./pages/Resource";
import Incident from "./pages/Incident";
import SearchResourcesForm from "./pages/SearchResourcesForm";
import ResourceReport from "./pages/ResourceReport";
import Home from "./components/Home";
import Error from "./components/Error";


import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"element={<Home />}>
          <Route index element={<MainMenu />} />
          <Route path="login" element={<Login />} />
          <Route path="resources" element={<Resource />} />
          <Route path="incidents" element={<Incident />} />
          <Route path="search-resources" element={<SearchResourcesForm />} />
          <Route path="resource-report" element={<ResourceReport />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
 
export default App;
