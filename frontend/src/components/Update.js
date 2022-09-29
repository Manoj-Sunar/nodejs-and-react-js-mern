import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Update() {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcatagory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    GetUpdateProductApi_id();
  }, []);

  const GetUpdateProductApi_id = async () => {
    const url = `http://localhost:8000/update/${params._id}`;
    let result = await fetch(url);
    result = await result.json();
    setname(result.name);
    setprice(result.price);
    setcatagory(result.category);
    setCompany(result.company);
  };

  const UpdateProduct = async () => {
    const url = `http://localhost:8000/put/${params._id}`;
    let result = await fetch(url, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    Navigate("/products");
  };

  return (
    <div className="container Add-product mt-3 p-3">
      <h5 className="text-center mb-3 fw-bolder">Update products</h5>
      <input
        type="text"
        value={name}
        className="form-control my-1 p-1 fw-bolder"
        onChange={(e) => setname(e.target.value)}
      />

      <input
        type="text"
        value={price}
        className="form-control my-1 p-1 fw-bolder"
        onChange={(e) => setprice(e.target.value)}
      />

      <input
        type="text"
        value={category}
        className="form-control my-1 p-1 fw-bolder"
        onChange={(e) => setcatagory(e.target.value)}
      />

      <input
        type="text"
        value={company}
        className="form-control my-1 p-1 fw-bolder"
        onChange={(e) => setCompany(e.target.value)}
      />

      <button className="btn btn-primary mt-1 mb-3" onClick={UpdateProduct}>
        {" "}
        Update product{" "}
      </button>
    </div>
  );
}
