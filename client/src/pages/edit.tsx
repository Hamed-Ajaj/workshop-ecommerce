import { toast } from 'sonner'
import { CreateProductForm } from "@/components/product-form";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const res = await fetch(`http://localhost:4000/api/products/${id}`)
      const data = await res.json();
      setProduct(data.product)
      setLoading(false)
    }
    fetchProduct()
  }, [])
  console.log(product)

  if (loading) {
    return <div>loading...</div>
  }

  const editProduct = async (value: { name: string, description?: string, price?: number, image?: string }) => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${product?.id}`, {
        method: "PUT",
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
      <CreateProductForm product={product} handleSubmit={editProduct} />
    </main>
  )

}

export default EditPage;
