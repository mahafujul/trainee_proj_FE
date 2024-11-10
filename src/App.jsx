import { useState } from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Employees from './components/Employees'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;
