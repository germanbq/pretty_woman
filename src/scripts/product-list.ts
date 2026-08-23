export function updateProductList(productsPerBatch = 16) {
    const grid = document.querySelector<HTMLElement>(".cards-grid");
    const template = document.querySelector<HTMLTemplateElement>("#remaining-products");
    const loadMore = document.querySelector<HTMLButtonElement>("#load-more");
    const filterMenu = document.querySelector<HTMLElement>("#filters-menu");

    if(!grid || !template) return;
    
    loadMore?.addEventListener("click", () => {
        const nextProd = Array.from(template.content.children).slice(0, productsPerBatch);
        nextProd.forEach((product) => grid.append(product));
        if (template.content.children.length === 0) {
            loadMore.hidden = true;
        }
    });
    //filtros
    const allProducts = [...Array.from(grid.querySelectorAll<HTMLElement>(".card-link")),
        ...Array.from(template.content.querySelectorAll<HTMLElement>(".card-link"))
    ];

    const nameCollator = new Intl.Collator("es", {
        sensitivity: "base",
        numeric: true,
    });
    function sortProducts(order: string, filteredProducts: HTMLElement[]) {
        const products = [...filteredProducts];
        switch(order) {
            case "alf-a":
                products.sort((a,b) => 
                    nameCollator.compare(a.dataset.name ?? "", b.dataset.name ?? "")
                );
                break;
            case "alf-d":
                products.sort((a,b) =>
                    nameCollator.compare(b.dataset.name ?? "", a.dataset.name ?? "")
                );
                break;
            case "price-a":
                products.sort((a,b) =>
                    Number(a.dataset.price ?? 0) - Number(b.dataset.price ?? 0)
                );
                break;
            case "price-d":
                products.sort((a,b) => 
                    Number(b.dataset.price ?? 0) - Number(a.dataset.price ?? 0)
                );
                break;
        }
        return products;
    }
    function renderProducts(filters: string[], order: string) {
        console.log(allProducts.length);
        const filteredProducts = filters.length === 0
            ? allProducts
            : allProducts.filter((product) =>
                    filters.includes(product.dataset.filterValue ?? ""));

        grid?.replaceChildren();
        template?.content.replaceChildren();
        
        const sortedProducts = sortProducts(order, filteredProducts);

        const initialProducts = sortedProducts.slice(0, productsPerBatch);
        const remainingProducts = sortedProducts.slice(productsPerBatch);

        initialProducts.forEach((product) => {
            grid?.append(product);
        })
        remainingProducts.forEach((product) => {
            template?.content.append(product);
        })

        if(loadMore) loadMore.hidden = remainingProducts.length === 0;
    };

    filterMenu?.addEventListener("products:filter", ((event: CustomEvent<{ filters: string[]; order: string }>) => {
        renderProducts(event.detail.filters, event.detail.order);
    }) as EventListener );
}