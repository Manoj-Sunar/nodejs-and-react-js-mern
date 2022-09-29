import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      Navigate("/");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const Navigate = useNavigate();

  const userLogin = async () => {
    console.log(email, password);
    const url = "http://localhost:8000/loginuser";
    let userLogin = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    userLogin = await userLogin.json();
    console.log(userLogin);

    if (userLogin.token) {
      localStorage.setItem("user", JSON.stringify(userLogin.user));
      localStorage.setItem("token", JSON.stringify(userLogin.token));
      Navigate("/");
    } else {
      alert("please Enter correct details");
    }
  };
  return (
    <>
      <div className="container login-container px-4 mt-2">
        <h5 className="text-center mt-3 p-2 mb-4 fw-bolder">User Login</h5>
        <input
          type="email"
          className="form-control p-1 fw-bolder"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={check ? "text" : "password"}
          className="form-control p-1 fw-bolder"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="checkbox pb-1 fw-bolder">
          <input
            type="checkbox"
            className="checkbox fw-bolder"
            value={check}
            onChange={(e) => setCheck(e.target.checked)}
          />
          <label className="mx-1 my-1 text-primary fw-bolder">
            show password
          </label>
        </div>
        <div className="pb-5">
          <button className="btn btn-primary fw-bolder" onClick={userLogin}>
            Login
          </button>
        </div>
      </div>

      <NavLink
        to="/signup"
        className="text-center create-account mt-1 fw-bolder"
      >
        <label>create Account</label>
      </NavLink>
    </>
  );
}
