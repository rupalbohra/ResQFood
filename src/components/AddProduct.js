import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  // let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    product_name: "",
    contact_number: "",
    quantity: "",
    expiry_date: "",
    price: "",
    location: "",
    email: "",
    // contact_number: "",
  });
  const [showForm, setShowForm] = useState(false);
  const handlePlusIconClick = () => {
    // Toggle the visibility of the form when the plus icon is clicked
    setShowForm(!showForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userEmail = localStorage.getItem("userEmail");
    console.log(
      JSON.stringify({
        product_name: credentials.product_name,
        contact_number: credentials.contact_number,
        quantity: credentials.quantity,
        expiry_date: credentials.expiry_date,
        price: credentials.price,
        location: credentials.location,
        email: userEmail,
        // location: credentials.contact_number,
      })
    );
    const response = await fetch("http://localhost:5000/api/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: credentials.product_name,
        contact_number: credentials.contact_number,
        quantity: credentials.quantity,
        expiry_date: credentials.expiry_date,
        price: credentials.price,
        location: credentials.location,
        email: userEmail,
        // location: credentials.contact_number,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      const errorMessage = json.errors.map((error) => error.msg);
      alert("Enter Valid Credentials: " + errorMessage);
    } else {
      setShowForm(false);
      // navigate("/login");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container d-flex justify-content-end">
        <div style={{ fontSize: "22px" }}>
          Add new Product
          <button
            className=" btn btn-info m-4"
            onClick={handlePlusIconClick}
            style={{
              cursor: "pointer",
            }}
          >
            {" "}
            +
          </button>
        </div>
      </div>
      <div>
        {showForm && (
          <div className="container mt-5 d-flex justify-content-center">
            <div
              style={{ width: "37vw" }}
              className=" p-3 bg-light rounded-3 mb-5"
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Product{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_name"
                    value={credentials.product_name}
                    onChange={onChange}
                    placeholder="Enter name of the product"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Phone Number{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact_number"
                    value={credentials.contact_number}
                    onChange={onChange}
                    placeholder="Enter phone number to be contacted for delivery"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Quantity{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="quantity"
                    value={credentials.quantity}
                    onChange={onChange}
                    placeholder="How much do you want to donate?"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Expiry Date{" "}
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    name="expiry_date"
                    value={credentials.expiry_date}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Price{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={credentials.price}
                    onChange={onChange}
                    placeholder="Enter 0 if you want to donate it for free"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Location{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={credentials.location}
                    onChange={onChange}
                    placeholder="Enter pickup location"
                  />
                </div>

                <button type="submit" className="m-3 btn btn-info">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
