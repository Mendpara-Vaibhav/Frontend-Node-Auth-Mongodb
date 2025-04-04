import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
// import User from "./components/User";

function App() {
  return (
    <>
      {/* <User /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route
            path="*"
            element={<h1>404 Page Not Found - Go Back Page Not Exists</h1>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
