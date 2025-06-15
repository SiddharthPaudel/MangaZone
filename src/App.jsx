import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./Homepage/HomePage";
import Product from "./Product/Product";
import './index.css';
import ProductDetails from "./Product Details/ProductDetails";
import MangaReader from "./MangaReader/MangaReader";
import Signup from "./SignUp/SignUp";
import Login from "./Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Product/>} />
          <Route path="productsdetails" element={<ProductDetails/>} />
          <Route path="reader" element={<MangaReader />} />
           <Route path="signUp" element={<Signup />} />
           <Route path="login" element={<Login/>} />

          

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
