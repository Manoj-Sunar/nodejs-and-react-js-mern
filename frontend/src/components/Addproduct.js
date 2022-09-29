import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Addproduct() {
  const [name, setPname] = useState("");
  const [price, setPprice] = useState("");
  const [category, setPcatagory] = useState("");
  const [company, setpCompany] = useState("");
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const url = "http://localhost:8000/products";
    let Product = await fetch(url, {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    Product = await Product.json();
    Navigate("/products");
  };

  return (
    <>
      <div className="container Add-product mt-3 p-3">
        <h5 className="text-center mb-3 fw-bolder">Add products</h5>
        <input
          type="text"
          className="form-control my-1 p-1 fw-bolder"
          placeholder="Enter product name"
          onChange={(e) => setPname(e.target.value)}
        />
        {error && !name && (
          <span className="text-danger d-block mb-3">Enter valid name</span>
        )}

        <input
          type="text"
          className="form-control my-1 p-1 fw-bolder"
          placeholder="Enter product price"
          onChange={(e) => setPprice(e.target.value)}
          required
        />
        {error && !price && (
          <span className="text-danger d-block mb-3">Enter price</span>
        )}

        <input
          type="text"
          className="form-control my-1 p-1 fw-bolder"
          placeholder="Enter product Catagory"
          onChange={(e) => setPcatagory(e.target.value)}
          required
        />
        {error && !category && (
          <span className="text-danger d-block mb-3">Enter valid category</span>
        )}

        <input
          type="text"
          className="form-control my-1 p-1 fw-bolder"
          placeholder="Enter product Company"
          onChange={(e) => setpCompany(e.target.value)}
          required
        />
        {error && !company && (
          <span className="text-danger d-block mb-3">Enter company name</span>
        )}

        <button className="btn btn-primary mt-1 mb-3" onClick={addProduct}>
          Add product
        </button>
      </div>
    </>
  );
}
