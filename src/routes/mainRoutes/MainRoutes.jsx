import { Routes, Route } from "react-router-dom";
import AboutMePage from "../../components/AboutMe/AboutMePage";
import ContactPage from "../../components/Contact/ContactPage";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import { Project } from "../../components/Project";
import SingleTaskPage from "../../components/SingleTaskPage/SingleTaskPage";

import './mainRoutes.css';

function MainRoutes() {
  return (
    <div className="main-routes">
      <Routes>
        <Route path="/" element={<AboutMePage />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:taskId" element={<SingleTaskPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;
