import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Shop from "./pages/shop";
function App() {
  return (
    <div className="w-full p-0 m-0">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;
