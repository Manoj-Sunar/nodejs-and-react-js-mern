import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import Footer from "./components/Footer";
import SignUp from "./components/SignUP";
import Private from "./components/Private";
import Login from "./components/Login";
import Addproduct from "./components/Addproduct";
import Product from "./components/Product";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Private />}>
            <Route path="/products" element={<Product />} />
            <Route path="/add" element={<Addproduct />} />
            <Route path="/update/:_id" element={<Update />} />
            <Route
              path="/logout"
              element={
                <h2 className="text-center">Logout Products components</h2>
              }
            />
            <Route
              path="/profile"
              element={
                <h2 className="text-center">profile Products components</h2>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
