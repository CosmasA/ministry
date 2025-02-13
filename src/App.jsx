import "./App.css";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Login/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import PropTypes from "prop-types";
import { removeToken } from "./components/Login/token";
import Schools from "./pages/Schools";
import Students from "./pages/Students";
import Home from "./pages/Home";
import SchoolsDetails from "./pages/SchoolsDetails";

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
  };

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const handleLogout = () => {
    removeToken(); // Remove token from storage
  };

  return (
    <div className="app-container">
      <Router basename="/ministry">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Private Route to Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard onLogout={handleLogout} />
              </PrivateRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="schools" element={<Schools />} />
            <Route path="students" element={<Students />} />
            <Route path="schools/:region" element={<SchoolsDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
