import { RowDataPacket } from "mysql2";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at: Date;
}

export interface TaskRow extends RowDataPacket {
  id: number;
  title: string;
  priority: number;
  status: string;
}

export interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface OrderItemInput {
  productId: number;
  quantity: number;
  price: number;
}
