import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCardList from "./components/ProductCardList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductCardList />} />
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/user" element={<User />} />
          <Route
            path="*"
            element={<h1>404 Page Not Found - Go Back Page Not Exists</h1>}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
