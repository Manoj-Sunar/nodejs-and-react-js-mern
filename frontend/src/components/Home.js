import React from "react";

export default function Home() {
  const auth = localStorage.getItem("user");
  return (
    <div>
      <h1 className="text-center fw-bolder text-primary mt-5 w-50 m-auto p-5">
        Hello Mr{" "}
        {
          <span className="text-danger">
            {JSON.parse(auth).firstname} {JSON.parse(auth).lastname}
          </span>
        }{" "}
        welcome to your expensies list
      </h1>
    </div>
  );
}
