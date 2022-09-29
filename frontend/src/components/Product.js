import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Product(props) {
  const [product_items, setProducts_item] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const url = "http://localhost:8000/products";
    let result = await fetch(url, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts_item(result);
  };

  const deleteProduct_items = async (_id) => {
    const url = `http://localhost:8000/delete/${_id}`;
    let result = await fetch(url, {
      method: "Delete",
    });

    result = await result.json();

    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    const url = `http://localhost:8000/search/${key}`;
    if (key) {
      let result = await fetch(url);
      result = await result.json();
      if (result) {
        setProducts_item(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="container">
      <h3 className="text-center fw-bolder mt-3">Product List</h3>
      <form className="d-flex my-3 w-50 m-auto">
        <input
          className="form-control me-2 fw-bolder text-dark"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={searchHandle}
        />
      </form>
      {product_items.length > 0 ? (
        <table className="table table-dark table-striped">
          <tbody>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Company name</td>
              <td>Delete Items</td>
              <td>Update Items</td>
            </tr>
          </tbody>

          {product_items.map((items, key) => (
            <tbody key={key}>
              <tr>
                <td>{items.name}</td>
                <td>{items.price}</td>
                <td>{items.category}</td>
                <td>{items.company}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct_items(items._id)}
                  >
                    Delete
                  </button>
                </td>

                <td>
                  <NavLink
                    to={`/update/${items._id}`}
                    className="btn btn-success"
                  >
                    Update
                  </NavLink>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <h1 className="text-center fw-bolder text-danger">No data found</h1>
      )}
    </div>
  );
}
