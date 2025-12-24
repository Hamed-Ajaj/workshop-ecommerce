import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import ProductDetails from "./pages/product-details";
import CreatePage from "./pages/create";
import EditPage from "./pages/edit";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:id/edit" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
