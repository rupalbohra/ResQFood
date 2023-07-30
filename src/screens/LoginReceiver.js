import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginReceiver() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch("http://localhost:5000/api/loginReceiver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/receiver");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div style={{ height: "310px", width: "900px" }}>
        <img
          src="https://previews.123rf.com/images/drogatnev/drogatnev1710/drogatnev171000039/87355929-supermarket-store-interior-with-goods-big-shopping-mall-interior-store-inside-checkout-counter.jpg"
          style={{
            objectFit: "fill",
            height: "250px",
            width: "1300px",
            filter: "brightness(80%)",
          }}
        ></img>
        <p style={{ fontSize: "45px", marginLeft: "580px" }}>Login</p>
      </div>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          style={{ width: "700px", marginLeft: "220px" }}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className=" m-3 btn bg-white text-info">
            Submit
          </button>
          <Link to="/signupReceiver" className="m-3 btn btn-danger">
            I'm a new User
          </Link>
          <div>
            <Link to="/loginProvider" className="m-3 btn bg-white text-info">
              Login as Food Provider?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
