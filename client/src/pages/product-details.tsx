import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Product } from "@/types/product"
import { useEffect, useState } from "react"


const ProductDetails = () => {
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
  return (
    <main className="container mx-auto py-8">
      <Card className="mx-auto max-w-3xl overflow-hidden">
        {product?.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-80 w-full object-cover"
          />
        )}

        <CardHeader>
          <CardTitle className="text-2xl">{product?.name}</CardTitle>
          {product?.price && (
            <p className="text-lg font-semibold text-muted-foreground">
              ${product?.price}
            </p>
          )}
        </CardHeader>

        <CardContent>
          {product?.description ? (
            <p className="leading-relaxed text-muted-foreground">
              {product?.description}
            </p>
          ) : (
            <p className="italic text-muted-foreground">
              No description provided.
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <Button asChild variant="outline">
            <Link to="/">Back</Link>
          </Button>

          {/* <div className="flex gap-2"> */}
          {/*   <Button asChild variant="outline"> */}
          {/*     <Link to={`/${product?.id}/edit`}>Edit</Link> */}
          {/*   </Button> */}
          {/**/}
          {/*   <Button variant="destructive"> */}
          {/*     Delete */}
          {/*   </Button> */}
          {/* </div> */}
        </CardFooter>
      </Card>
    </main>
  )
}

export default ProductDetails
