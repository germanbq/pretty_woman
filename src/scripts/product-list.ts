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

    function renderProducts(filters: string[]) {
        const filteredProducts = filters.length === 0
            ? allProducts
            : allProducts.filter((product) =>
                    filters.includes(product.dataset.filterValue ?? ""));

        grid?.replaceChildren();
        template?.content.replaceChildren();

        const initialProducts = filteredProducts.slice(0, productsPerBatch);
        const remainingProducts = filteredProducts.slice(productsPerBatch);

        initialProducts.forEach((product) => {
            grid?.append(product);
        })
        remainingProducts.forEach((product) => {
            template?.content.append(product);
        })

        if(loadMore) loadMore.hidden = remainingProducts.length === 0;
    };

    filterMenu?.addEventListener("products:filter", ((event: CustomEvent<{ filters: string[] }>) => {
        renderProducts(event.detail.filters);
    }) as EventListener );
}