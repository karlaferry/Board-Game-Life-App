// Dependency Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component Imports
import Footer from "./components/Footer.jsx";
import Home from "./components/route.Home/Home";
import LogIn from "./components/route.LogIn/LogIn";
import Register from "./components/route.Register/Register";
import Dashboard from "./components/route.Dashboard/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard:username" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
