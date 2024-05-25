import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import Books from "../pages/Books/Books";
import Book from "../pages/Book/Book";
import About from "../pages/About/About";
import Cart from "../pages/Cart/Cart";
export default function router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
