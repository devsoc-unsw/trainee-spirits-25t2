import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";

function NotFound() {
  return <p>Not Found</p>;
}

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppLayout />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
