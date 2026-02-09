"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { productsRows } from "@/admin/mock-data";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ProductRow = (typeof productsRows)[number];

const stockBadge = (value: string) =>
  value === "Out of stock"
    ? "bg-rose-50 text-rose-600"
    : "bg-emerald-50 text-emerald-600";

const AdminProducts = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<ProductRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-100" />
            <span className="font-semibold text-slate-900">
              {row.getValue("name")}
            </span>
          </div>
        ),
      },
      { accessorKey: "id", header: "Product ID" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "quantity", header: "Quantity" },
      { accessorKey: "sale", header: "Sale" },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
          <Badge className={`rounded-full ${stockBadge(row.getValue("stock"))}`}>
            {row.getValue("stock")}
          </Badge>
        ),
      },
      { accessorKey: "startDate", header: "Start date" },
      {
        id: "actions",
        header: "Action",
        cell: () => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-rose-500" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: productsRows,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">All Products</h1>
          <p className="text-sm text-slate-500">
            Tip search by Product ID: Each product is provided with a unique ID.
          </p>
        </div>
        <Button className="rounded-full" asChild>
          <Link to="/admin/products/new">+ Add new</Link>
        </Button>
      </div>

      <Card className="rounded-2xl border-slate-200 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size} entries
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Search here..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-xs"
          />

          <Select
            value={(table.getColumn("stock")?.getFilterValue() as string) ?? "all"}
            onValueChange={(value) =>
              table.getColumn("stock")?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Out of stock">Out of stock</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="default">
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by (Default)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Sort by (Default)</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="quantity">Quantity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {table.getRowModel().rows.length} of {productsRows.length}
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    table.previousPage();
                  }}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }).map((_, index) => (
                <PaginationItem key={`page-${index}`}>
                  <PaginationLink
                    href="#"
                    isActive={index === currentPage}
                    onClick={(event) => {
                      event.preventDefault();
                      table.setPageIndex(index);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    table.nextPage();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};

export default AdminProducts;
