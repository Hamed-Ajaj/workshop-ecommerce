import type { Product } from "@/types/product";
import ProductCard from "./product-card";
import { useEffect, useState } from "react";

const ProductList = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true)
      const res = await fetch("http://localhost:4000/api/products")
      const data = await res.json()
      setProducts(data.products)
      setLoading(false)
    }

    fetchProducts()

  }, [])

  if (loading) {
    return <div>loading</div>
  }

  return (

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product}
          onDelete={(id) =>
            setProducts((prev) => prev.filter((p) => p.id !== id))
          }
        />
      ))}
    </div>
  )
}

export default ProductList;
