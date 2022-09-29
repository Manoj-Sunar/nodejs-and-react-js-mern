import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img
            src="https://www.freepik.com/free-vector/technological-logo-design_1187936.htm#query=link%20logo&position=1&from_view=keyword"
            alt=""
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className=" navbar-nav ms-auto mb-2 mb-lg-0 fw-bolder">
              {auth ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link active">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/products" className="nav-link active">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/add" className="nav-link">
                      Add Product
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/update" className="nav-link">
                      Update Product
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-link" onClick={Logout}>
                      Logout ( {JSON.parse(auth).firstname} ){" "}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">
                      SignUp
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
