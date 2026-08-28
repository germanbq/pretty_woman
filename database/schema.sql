CREATE TABLE brands (
	id INT UNSIGNED AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL UNIQUE, 
    image_path VARCHAR(500) NOT NULL,
    PRIMARY KEY(id)
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE product_types (
	id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    image_path VARCHAR(500) NOT NULL,
    PRIMARY KEY(id)
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE products (
	id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(500) NOT NULL, 
    brand_id INT UNSIGNED NOT NULL,
    product_type_id INT UNSIGNED NOT NULL,
    CONSTRAINT chk_product_price CHECK (price > 0),
    FOREIGN KEY(brand_id) REFERENCES brands(id) ON DELETE RESTRICT,
    FOREIGN KEY(product_type_id) REFERENCES product_types(id) ON DELETE RESTRICT,
    PRIMARY KEY(id),
    INDEX idx_products_brand_type (brand_id, product_type_id),
    INDEX idx_products_product_type (product_type_id)
) DEFAULT CHARSET = utf8mb4;
