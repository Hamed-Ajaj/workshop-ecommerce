import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Shop from "./pages/shop";
import ProductDetails from "./pages/product-details";
import CartPage from "./pages/cart";
import Footer from "./components/footer";
import NotFoundPage from "./pages/not-found";
function App() {
  return (
    <div className="min-h-screen w-full p-0 m-0 flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
