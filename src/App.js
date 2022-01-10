import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./components/route.Home/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
