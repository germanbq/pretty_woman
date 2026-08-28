import { pool } from "./connection";
import type { Brand, ProductType, Product, FilterCount } from "./interfaces";

//recupera todas las marcas sin filtros
export async function getAllBrands() {
   try {
        const [rows] = await pool.execute<Brand[]>(
            `SELECT id, name, image_path FROM brands ORDER BY name ASC`);
        return rows;
   }
   catch (error) {
        console.error("Error al consultar todas las marcas", error);
        throw error;
    }
}
//recupera todos los tipos de productos sin filtros
export async function getAllProductTypes() {
   try {
        const [rows] = await pool.execute<ProductType[]>(
            `SELECT id, name, image_path FROM product_types ORDER BY name ASC`);
        return rows;
   }
   catch (error) {
        console.error("Error al consultar todos los tipos de producto", error);
        throw error;
    }
}
//recupera todos los productos sin filtros y además añade de propiedades, el nombre de la marca y tipo de producto
export async function getAllProducts() {
   try {
        const [rows] = await pool.execute<Product[]>(
            `SELECT p.id, p.name, p.price, p.description, p.image_path, p.brand_id, 
            p.product_type_id, b.name AS brand, pt.name AS type FROM products AS p 
            JOIN brands AS b ON p.brand_id = b.id 
            JOIN product_types AS pt ON p.product_type_id = pt.id`);
        return rows;
   }
   catch (error) {
        console.error("Error al consultar todos los productos", error);
        throw error;
    }
}
//recupera todos los productos de una marca  y además añade de propiedades, el nombre de la marca y tipo de producto
export async function getProductsByBrand(brand_id: number) {
    try {
        const [rows] = await pool.execute<Product[]>(
            `SELECT p.id, p.name, p.price, p.description, p.image_path, p.brand_id, p.product_type_id, 
            b.name AS brand, pt.name AS type FROM products AS p 
            JOIN brands AS b ON p.brand_id = b.id 
            JOIN product_types AS pt ON p.product_type_id = pt.id 
            WHERE p.brand_id = ?`,
            [brand_id]);
        return rows;
    }
    catch (error) {
        console.error("Error al consultar los productos filtrados por marca", error);
        throw error;
    }
}
//recupera todos los productos de un tipo de producto  y además añade de propiedades, el nombre de la marca y tipo de producto
export async function getProductsByType(product_type_id: number) {
    try {
        const [rows] = await pool.execute<Product[]>(
            `SELECT p.id, p.name, p.price, p.description, p.image_path, p.brand_id, p.product_type_id, 
            b.name AS brand, pt.name AS type FROM products AS p 
            JOIN brands AS b ON p.brand_id = b.id 
            JOIN product_types AS pt ON p.product_type_id = pt.id 
            WHERE p.product_type_id = ?`,
            [product_type_id]);
        return rows;
    }
    catch (error) {
        console.error("Error al consultar los productos filtrados por tipo de producto", error);
        throw error;
    }
}
//recupera el recuento de productos de cada tipo para una marca
export async function getProductTypeCountsByBrand(brand_id: number) {
    try {
        const [rows] = await pool.execute<FilterCount[]>(
            `SELECT pt.name, COUNT(*) as numProducts FROM products AS p 
            JOIN product_types AS pt ON p.product_type_id = pt.id 
            WHERE p.brand_id= ? 
            GROUP BY pt.id, pt.name`,
            [brand_id])
        return rows;
    }
    catch (error) {
        console.error("Error al consultar el número de productos de cada tipo de producto por marca", error);
        throw error;
    }
}
//recupera el recuento de productos de cada marca para un tipo de producto
export async function getBrandCountsByProductType(product_type_id: number) {
    try {
        const [rows] = await pool.execute<FilterCount[]>(
            `SELECT b.name, COUNT(*) as numProducts FROM products AS p 
            JOIN brands AS b ON p.brand_id = b.id 
            WHERE p.product_type_id= ? 
            GROUP BY b.id, b.name`,
            [product_type_id])
        return rows;
    }
    catch (error) {
        console.error("Error al consultar el número de productos de cada marca por tipo de producto", error);
        throw error;
    }
}
