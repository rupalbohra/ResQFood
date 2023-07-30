import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddProduct from "../components/AddProduct";
import Footer from "../components/Footer";

const HomeReceiver = () => {
  const [search, setSearch] = useState("");
  const [myProducts, setMyProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      fetchMyProducts(storedEmail);
    }
  }, []);

  const fetchMyProducts = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/api/myProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data received from the server:", data);

      if (Array.isArray(data.myProducts)) {
        setMyProducts(data.myProducts);
      } else {
        setMyProducts([]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  console.log("myProducts:", myProducts); // Add this log to check myProducts state

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="mb-5">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                style={{
                  height: "550px",
                  width: "900px",
                  filter: "brightness(50%)",
                }}
                src="https://source.unsplash.com/random/300×300/?fruit"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                style={{
                  height: "550px",
                  width: "900px",
                  filter: "brightness(50%)",
                }}
                src="https://source.unsplash.com/random/300×300/?milk"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                style={{
                  height: "550px",
                  width: "900px",
                  filter: "brightness(50%)",
                }}
                src="https://source.unsplash.com/random/300×300/?vegetables"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {myProducts !== null ? (
        <div className="row">
          {myProducts.length > 0 ? (
            myProducts
              .filter((product) =>
                product.product_name.toLowerCase().includes(search)
              )
              .map((product) => (
                <div key={product._id} className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={`https://source.unsplash.com/random/900x700/?${encodeURIComponent(
                        product.product_name
                      )}`}
                      alt="Product Image"
                    />
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8">
                          <h5
                            className="card-title mt-3 mb-3"
                            style={{ fontSize: "30px" }}
                          >
                            {product.product_name}
                          </h5>
                        </div>
                        <div
                          className="btn btn-info mt-3 mb-5"
                          style={{ cursor: "default" }}
                        >
                          <p className="card-text">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="card-text">
                        Contact Number: {product.contact_number}
                      </p>
                      <p className="card-text">
                        Expiry Date: {product.expiry_date}
                      </p>
                      <p className="card-text">Location: {product.location}</p>
                      <p className="card-text" style={{ fontSize: "24px" }}>
                        ₹{product.price}
                      </p>
                      <div className="btn btn-info">Add to Cart</div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p>No products found for the user.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeReceiver;
