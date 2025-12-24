import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="w-full py-2 px-4 border border-b-gray-300">
      <div className="flex mx-auto   justify-between items-center p-5 max-w-7xl">
        <h1 className="font-bold text-2xl"><Link to="/">Products Management</Link></h1>
        <div>
          <Button onClick={() => navigate("/create")} className="cursor-pointer">Add Product</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
