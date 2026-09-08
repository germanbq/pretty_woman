# Pretty Woman
## Descripción del repositorio
Este repositorio contiene el código de la página web de Pretty Woman, una tienda física especializada en productos profesionales de peluquería y cosmética. La tienda está ubicada en la calle de José del Pino, 6, Villaverde, Madrid.

La web funciona como un catálogo digital que permite la consulta de los productos disponibles, navegar por marcas y tipos de producto, utilizar el buscador, aplicar filtros, ordenar los resultados y consultar la información detallada de cada artículo.

Actualmente, la página no permite realizar compras en línea. Su objetivo es facilitar la consulta de los productos y proporcionar información sobre el establecimiento.

Se han utilizado las siguientes tecnologías: Astro, TypeScript, Tailwind CSS, Font Awesome y Bootstrap Icons.

## ¿Por qué Astro?
Se ha utilizado Astro como framework debido a los siguientes motivos:
- Es un framework pensado para el contenido, lo que encaja perfectamente con un sitio web desarrollado, principalmente, para mostrar un catálogo de productos.
- Astro prerenderiza las páginas como HTML durante la compilación. De esta forma, el navegador recibe el contenido ya construido.
- Al enviar HTML preparado, también envía poco JavaScript, lo que favorece un mejor rendimiento al reducir la cantidad de código que el dispositivo del visitante debe descargar y ejecutar.

## Estructura de la carpeta src
La carpeta src contiene el código principal y tiene la siguiente organización:
- Components: contiene componentes reutilizables. Algunos se reutilizan en varias páginas y otros permiten separar responsabilidades y evitar acumular complejidad en archivos principales.
- Data-access: contiene los archivos relacionados con la obtención de datos de la base de datos.
- Layouts: solo contiene el Layout principal.
- Pages: contiene los archivos que generan las páginas y las rutas.
- Scripts: archivos que contienen lógica TypeScript, la cual se ha querido separar para evitar acumular complejidad en otros archivos.
- Styles: contiene estilos CSS compartidos entre varios componentes y páginas.

```text
 src
  ├── components
  │     ├── back-arrow.astro
  │     ├── contact.astro
  │     ├── filter-menu.astro
  │     ├── footer.astro
  │     ├── header.astro
  │     ├── opt-side-menu.astro
  │     ├── overlay.astro
  │     ├── product-card.astro
  │     ├── product-catalog.astro
  │     ├── search-menu.astro
  │     └── side-submenu.astro
  ├── data-access
  │     ├── connection.ts
  │     ├── interfaces.ts
  │     ├── querys.ts
  ├── layouts
  │      └── Layout.astro
  ├── pages
  │     ├── index.astro
  │     ├── marcas/[name].astro
  │     ├── tipos-producto/[name].astro
  │     └── productos/[id].astro
  ├── scripts
  │     ├── close-menus.ts
  │     ├── filter-searched-products.ts
  │     ├── focus-trap.ts
  │     ├── product-list.ts
  │     ├── session-storage.ts
  │     ├── side-submenus.ts
  │     ├── slugify.ts
  │     └── url-storage.ts
  └── styles
        └── styles.css
```

## Diseño de la base de datos

La base de datos sigue un modelo relacional compuesto por tres tablas principales:

- brands: almacena las marcas disponibles.
- product_types: almacena los tipos de producto.
- products: almacena la información de los productos.

Cada producto pertenece a una única marca y a un único tipo de producto. Una marca y un tipo pueden estar asociados a varios productos.

```text
  BRANDS {
      INT id PK
      VARCHAR name
      VARCHAR image_path
  }

  PRODUCT_TYPES {
      INT id PK
      VARCHAR name
      VARCHAR image_path
  }

  PRODUCTS {
      INT id PK
      VARCHAR name
      DECIMAL price
      TEXT description
      VARCHAR image_path
      INT brand_id FK
      INT product_type_id FK
  }
```
La carpeta database contiene el archivo schema.sql que contiene el código exacto utilizado para crear las tablas de la base de datos.