import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./Homepage/HomePage";
import Product from "./Product/Product";
import "./index.css";
import ProductDetails from "./Product Details/ProductDetails";
import MangaReader from "./MangaReader/MangaReader";
import Signup from "./SignUp/SignUp";
import Login from "./Login/Login";
import Bookmark from "./Bookmark/Bookmark";
import RentPage from "./Rent/RentPage";
import UpdateProfile from "./Profile/UpdateProfile";
import RentDetails from "./RentDetails/RentDetails";
import AdminLayout from "./Admin/Layout/AdminLayout";
import Dashboard from "./Admin/Dashboard/AdminDashboard";
import AddManga from "./Admin/AddManga/AddManga";
import AddChapter from "./Admin/AddChapter/AddChapter";
import UserTable from "./Admin/UserTable/UserTable";
import RentalTable from "./Admin/Rental/RentalTable";
import MangaTable from "./Admin/Manga/MangaTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Product />} />
          <Route path="productsdetails" element={<ProductDetails />} />
          <Route path="reader" element={<MangaReader />} />
          <Route path="signUp" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/rentDetails" element={<RentDetails />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="addmanga" element={<AddManga />} />
          <Route path="addchapter" element={<AddChapter />} />
          <Route path="rental" element={<RentalTable/>} />
          <Route path="manga" element={<MangaTable/>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
