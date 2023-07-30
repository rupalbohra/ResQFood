import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginReceiver from "./screens/LoginReceiver";
import LoginProvider from "./screens/LoginProvider";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// import MyOrder from "./screens/MyOrder";
import { CartProvider } from "./components/ContextReducer";
import MyOrders from "./screens/MyOrders";
import SignupReceiver from "./screens/SignupReceiver";
import SignupProvider from "./screens/SignupProvider";
import HomeProvider from "./screens/HomeProvider";
import HomeReceiver from "./screens/HomeReceiver";
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/loginReceiver" element={<LoginReceiver />} />
            <Route exact path="/loginProvider" element={<LoginProvider />} />
            <Route exact path="/signupReceiver" element={<SignupReceiver />} />
            <Route exact path="/signupProvider" element={<SignupProvider />} />
            <Route exact path="/myOrder" element={<MyOrders />} />
            <Route exact path="/provider" element={<HomeProvider />} />
            <Route exact path="/receiver" element={<HomeReceiver />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
