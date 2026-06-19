import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  // Show admin buttons only on admin pages
  const showAdminButtons =
    token &&
    (
      location.pathname === "/admin" ||
      location.pathname === "/add"
    );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">

      {/* BRAND */}
      <Link className="navbar-brand fw-bold" to="/">
        JobConnect
      </Link>

      {/* HAMBURGER */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* MENU */}
      <div className="collapse navbar-collapse" id="navbarNav">

        {/* LEFT SIDE */}
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Jobs
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact Us
            </NavLink>
          </li>

        </ul>

        {/* RIGHT SIDE */}
        <div className="d-flex gap-2">

          {showAdminButtons && (
            <>
              <NavLink className="btn btn-success btn-sm" to="/admin">
                Dashboard
              </NavLink>

              <button
                className="btn btn-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;