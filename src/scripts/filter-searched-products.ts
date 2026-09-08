import type { Product } from "../data-access/interfaces";

function getAllProducts(): Product[] {
    const data = document.querySelector<HTMLElement>("#search-products-data");

    if (!data?.dataset.products) return [];

    return JSON.parse(data.dataset.products);
}

function createProduct(product: Product): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>("#product-search-template");
    const element = template?.content.firstElementChild?.cloneNode(true) as HTMLElement;

    const link = element.querySelector<HTMLAnchorElement>(".sch-product-article");
    link?.setAttribute("href", `/products/${product.id}`);

    const image = element.querySelector<HTMLImageElement>(".sch-product-article-img");
    image?.setAttribute("src", product.image_path);
    image?.setAttribute("alt", product.name);

    const title = element.querySelector<HTMLElement>(".sch-product-article-title");
    if(title) {
        title.textContent = product.name;
    }

    const price = element.querySelector<HTMLElement>(".sch-product-article-price");
    if(price) {
        price.textContent = `${Number(product.price).toFixed(2)}€`;
    }

    return element;
}

function filterSearchedProducts(products: Product[], searchTerm: string): Product[] {
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function manageSearchTexts(searchedTerm: string, visibleProducts: number): void {
    const noResults = document.querySelector<HTMLElement>("#sch-no-results");
    const beginText = document.querySelector<HTMLElement>("#sch-begin-text");

    if(beginText) beginText.hidden = visibleProducts > 0 || searchedTerm.length > 2;
    if(noResults) noResults.hidden = visibleProducts > 0 || searchedTerm.length < 3;
}

export function displaySearchedProducts(): void {
    const container = document.querySelector<HTMLElement>(".search-products-container");
    container?.replaceChildren();
    
    const searchedTerm = (document.querySelector<HTMLInputElement>("#search-input")?.value || "").trim();
    if(searchedTerm.length < 3) {
        manageSearchTexts(searchedTerm, 0);
        return;
    }
    
    const products = getAllProducts();
    const matches = filterSearchedProducts(products, searchedTerm);
    manageSearchTexts(searchedTerm, matches.length);
    
    matches.forEach(product => {
        const productElement = createProduct(product);
        container?.appendChild(productElement);
    });
}