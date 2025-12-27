import type { Product } from "@/types/product";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product, onDelete }: { product: Product, onDelete: (id: number) => void }) => {
  const navigate = useNavigate()
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${product.id}`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        toast.success("product deleted successfully")
        onDelete(product.id)
      }
    }
    catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
      else {
        toast.error(("Unexpected Error"))
      }
    }
  }
  return (

    <Card key={product.id} className="flex flex-col">
      {product.image_url ? (
        <img
          src={`http://localhost:4000${product.image_url}`}
          alt={product.name}
          className="h-48 w-full rounded-t-lg object-cover"
        />
      ) : <div className="w-full h-48 rounded-t-lg object-cover bg-gray-400" />}

      <CardHeader>
        <Link to={`/${product.id}`}>
          <CardTitle>{product.name}</CardTitle>
        </Link>
        {product.price && (
          <CardDescription className="text-base font-semibold">
            ${product.price}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        {product.description && (
          <p className="text-sm text-muted-foreground">
            {product.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button onClick={() => navigate(`/${product.id}/edit`)} variant="outline" className="flex-1">
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete} className="flex-1">
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard;
