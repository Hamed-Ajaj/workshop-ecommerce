import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Shop from "./pages/shop";
import ProductDetails from "./pages/product-details";
import CartPage from "./pages/cart";
import NotFoundPage from "./pages/not-found";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import PublicLayout from "./components/layouts/public-layout";
import AdminLayout from "./components/layouts/admin-layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminAddProduct from "./pages/admin/add-product";
import AdminUsers from "./pages/admin/users";
import AdminAddUser from "./pages/admin/add-user";
function App() {
  return (
    <div className="min-h-screen w-full p-0 m-0 flex flex-col">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminAddProduct />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/new" element={<AdminAddUser />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
