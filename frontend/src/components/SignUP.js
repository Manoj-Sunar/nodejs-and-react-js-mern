import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const Submit = async () => {
    let result = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.createData));
    localStorage.setItem("token", JSON.stringify(result.token));
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  return (
    <>
      <h5 className="text-center my-3 fw-bolder">Shign up Component</h5>
      <form action="" className="signup-form mt-3 p-4 pb-5 " onClick={onSubmit}>
        <input
          type="text"
          className="form-control  my-2 p-1 fw-bolder"
          placeholder="Enter firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          className="form-control  my-2 p-1 fw-bolder"
          placeholder="Enter lastname"
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
        />
        <input
          type="text"
          className="form-control  my-2 p-1 fw-bolder"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          className="form-control  my-2 p-1 fw-bolder"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        <button className="btn btn-primary fw-bolder" onClick={Submit}>
          Signup
        </button>
      </form>
    </>
  );
}
