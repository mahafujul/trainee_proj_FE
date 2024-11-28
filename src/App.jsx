import { useState } from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Employees from "./components/Employees";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "2rem",
        margin: "0 auto",
        maxWidth: "1280px",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
