// Dependency Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component Imports
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/route.Home/Home";
import LogIn from "./components/route.LogIn/LogIn";
import Register from "./components/route.Register/Register";
import Dashboard from "./components/route.Dashboard/Dashboard";
import About from "./components/route.About/About";
import ReviewsResults from "./components/route.ReviewsResults/ReviewsResults";
import ReviewPage from "./components/route.ReviewPage/ReviewPage";
import ErrorPage from "./components/ErrorPage";
import { QueryProvider } from "./contexts/QueryContext.js";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <div>
      <QueryProvider>
        <UserProvider>
          <BrowserRouter>
            <Header />
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
              <Route path="/review/:review_id" element={<ReviewPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </UserProvider>
      </QueryProvider>
    </div>
  );
}

export default App;
