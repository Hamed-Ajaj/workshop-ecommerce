import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Shop from "./pages/shop";
import ProductDetails from "./pages/product-details";
import CartPage from "./pages/cart";
import Footer from "./components/footer";
function App() {
  return (
    <div className="w-full p-0 m-0">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
