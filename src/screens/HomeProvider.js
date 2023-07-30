import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddProduct from "../components/AddProduct";
import Footer from "../components/Footer";

const HomeProvider = () => {
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
      <hr className="mb-0 mt-5" />
      <div>
        <AddProduct />
      </div>
      <hr className="mb-5 mt-0" />
      {myProducts !== null ? (
        <div className="row">
          {myProducts.length > 0 ? (
            myProducts.map((product) => (
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
                    <p className="card-text">Price: {product.price}</p>
                    <p className="card-text">Location: {product.location}</p>
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

export default HomeProvider;
