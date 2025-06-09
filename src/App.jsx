import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./Homepage/HomePage";
import Product from "./Product/Product";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Product/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
