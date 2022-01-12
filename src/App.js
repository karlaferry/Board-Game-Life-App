// Dependency Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component Imports
import Footer from "./components/Footer.jsx";
import Home from "./components/route.Home/Home";
import LogIn from "./components/route.LogIn/LogIn";
import Register from "./components/route.Register/Register";
import Dashboard from "./components/route.Dashboard/Dashboard";
import About from "./components/route.About/About";
import ReviewCard from "./components/route.ReviewPage/ReviewPage";
import ReviewsResults from "./components/route.ReviewsResults/ReviewsResults";
import { QueryProvider } from "./contexts/QueryContext.js";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <QueryProvider>
      <UserProvider>
        <div>
          <BrowserRouter>
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/:username" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/reviews/:category/:title"
                  element={<ReviewsResults />}
                />
                <Route path="/review/:review_id" element={<ReviewCard />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </UserProvider>
    </QueryProvider>
  );
}

export default App;
