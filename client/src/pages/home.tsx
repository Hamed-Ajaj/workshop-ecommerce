import ProductList from "@/components/product-list"
import type { Product } from "@/types/product"
import { useEffect, useState } from "react"


const HomePage = () => {
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
  console.log(products)
  if (loading) {
    return <div>loading</div>
  }
  return (
    <main className="container mx-auto py-8">
      <ProductList />
    </main>
  )
}

export default HomePage
