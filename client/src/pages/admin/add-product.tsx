"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  salePrice: z.string().optional(),
  schedule: z.string().optional(),
  brand: z.string().min(1, "Brand is required"),
  color: z.string().optional(),
  size: z.string().optional(),
  sku: z.string().optional(),
  stock: z.string().min(1, "Stock is required"),
  tags: z.string().optional(),
  description: z.string().min(10, "Description is required"),
});

const AddProduct = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      price: "",
      salePrice: "",
      schedule: "",
      brand: "",
      color: "",
      size: "",
      sku: "",
      stock: "",
      tags: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const result = schema.safeParse(value);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message ?? "Invalid input");
        return;
      }
      toast.success("Product saved (mock)");
    },
  });

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    setFiles((prev) => [...prev, ...Array.from(selected)]);
  };

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Add Product</h1>
        <p className="text-sm text-slate-500">
          Upload images and provide the essential details.
        </p>
      </div>

      <Card className="rounded-2xl border-slate-200 p-6">
        <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/30 p-8 text-center">
          <input
            type="file"
            multiple
            className="hidden"
            id="product-images"
            onChange={(event) => handleFiles(event.target.files)}
          />
          <label
            htmlFor="product-images"
            className="cursor-pointer text-sm text-orange-500"
          >
            Drop your images here or click to browse
          </label>
        </div>
        {files.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="rounded-2xl border border-slate-100 bg-white p-3 text-sm text-slate-600"
              >
                <div className="h-28 w-full overflow-hidden rounded-xl bg-slate-100">
                  {previews[index] ? (
                    <img
                      src={previews[index]}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-2 truncate text-xs">{file.name}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Card>

      <Card className="rounded-2xl border-slate-200 p-6">
        <form
          className="grid gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="title">
            {(field) => (
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Product title
                </label>
                <Input
                  placeholder="Enter title"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors?.length ? (
                  <p className="mt-1 text-xs text-rose-500">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <div className="grid gap-4 md:grid-cols-2">
            <form.Field name="category">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Category
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            <form.Field name="brand">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Brand
                  </label>
                  <Input
                    placeholder="Choose brand"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <form.Field name="price">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Price
                  </label>
                  <Input
                    placeholder="$ Price"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="salePrice">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Sale price
                  </label>
                  <Input
                    placeholder="$ Sale Price"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="schedule">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Schedule
                  </label>
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <form.Field name="color">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Color
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
            <form.Field name="size">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Size
                  </label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <form.Field name="sku">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    SKU
                  </label>
                  <Input
                    placeholder="Enter SKU"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="stock">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Stock
                  </label>
                  <Input
                    placeholder="Enter Stock"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="tags">
              {(field) => (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Tags
                  </label>
                  <Input
                    placeholder="Enter a tag"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => (
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Description
                </label>
                <Textarea
                  placeholder="Short description about product"
                  rows={4}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </div>
            )}
          </form.Field>

          <div className="flex justify-end">
            <Button type="submit" className="rounded-full">
              Save product
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
