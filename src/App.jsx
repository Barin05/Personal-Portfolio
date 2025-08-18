import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import SkidPage from "./components/SkidPage"
import "./index.css";
import Drone from "./components/Drone";
import ProjectsPage from "./components/ProjectsPage";
import Spacecraft from "./components/Spacecraft";
import Maze from "./components/Maze";
import Website from "./components/Website";

function App() {

  return (
    <>
      <BrowserRouter> 
        <Routes>  
          <Route index element={<Home />}/>
          <Route path="/skid" element={<SkidPage />} />
          <Route path="/drone" element={<Drone />} />
          <Route path="/spacecraft" element={<Spacecraft />} />
          <Route path="/projects" element={<ProjectsPage/>} />
          <Route path="/maze" element={<Maze/>} />
          <Route path="/website" element={<Website/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
