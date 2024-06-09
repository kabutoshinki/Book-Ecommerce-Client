import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import Books from "../pages/Books/Books";
import Book from "../pages/Book/Book";
import About from "../pages/About/About";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Profile/Profile";
import Success from "../pages/Status/Success";
import Failed from "../pages/Status/Failed";
import OrderHistory from "../pages/Order/OrderHistory";
import RedirectPage from "../pages/Status/Loading";
// Import your login component

function AppRouter() {
  const location = useLocation();

  // Define the paths where you don't want to show the Nav component
  const pathsWithoutNav = ["/login", "/register"];

  return (
    <>
      {!pathsWithoutNav.includes(location.pathname) && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order_history" element={<OrderHistory />} />
        <Route path="/loading" element={<RedirectPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!pathsWithoutNav.includes(location.pathname) && <Footer />}
    </>
  );
}

export default AppRouter;
