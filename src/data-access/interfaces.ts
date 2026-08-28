import type { RowDataPacket } from "mysql2";

export interface Brand extends RowDataPacket {
    id: number;
    name: string;
    image_path: string;
}

export interface ProductType extends RowDataPacket {
    id: number;
    name: string;
    image_path: string;
}

export interface Product extends RowDataPacket {
    id: number;
    name: string;
    price: string;
    description: string;
    image_path: string;
    brand_id: number;
    product_type_id: number;
    brand: string;
    type: string;
}

export interface FilterCount extends RowDataPacket {
    name: string;
    numProducts: number;
}