import { Button } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../assets/images/ministry.png";
import { FaHome, FaCog, FaUsers, FaTools, FaBuilding } from "react-icons/fa";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    console.log("Logged Out Successfully!");
    navigate("/");
  };

  return (
    <div className="dashboard_container">
      {/* Left Sidebar Navigation */}
      <div className="left_container">
        <div className="nav-brand">
          <div className="text-align-center">
            <Link
              to="/dashboard/home"
              className="text-decoration-none text-black  d-flex align-items-center justify-content-center"
            >
              <img className="logo" src={Logo} alt="MOE&S Logo" />
              <h2>MOE&S</h2>
            </Link>
          </div>
          <div className="middle-border"></div>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/dashboard/home">
                <FaHome className="sidebar-icon" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/schools">
                <FaBuilding className="sidebar-icon" />
                Schools
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaUsers className="sidebar-icon" />
                Students
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaTools className="sidebar-icon" />
                Analytics
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaCog className="sidebar-icon" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <Button
          variant="outline-danger"
          className="logout_btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {/* Right Content Area */}
      <div className="right_container">
        <Outlet />
      </div>
    </div>
  );
};
Dashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Dashboard;
