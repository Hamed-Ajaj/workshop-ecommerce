import { CreateProductForm } from "@/components/product-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
const CreatePage = () => {
  const navigate = useNavigate()
  const handleCreateProduct = async (value: { name: string, description?: string, price?: number, image?: string }) => {

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value.name,
          description: value.description,
          price: Number(value.price),
          image_url: value.image,
        }),
      });
      if (res.ok) {
        toast.success("Product created successfully")
        navigate("/")
      }
    }
    catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
      else {
        toast.error("Unkown Error")
      }
    }
  }
  return (
    <main className="min-w-full min-h-screen mx-auto flex justify-center items-center">
      <CreateProductForm handleSubmit={handleCreateProduct} />
    </main>
  )
}

export default CreatePage;
