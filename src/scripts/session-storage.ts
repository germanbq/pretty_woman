//recuperar la cantidad de productos que había antes
export function getVisibleProducts(productsPerBatch: number): number {
    const storageKey = `vis-prod:${location.pathname}${location.search}`
    return Number(sessionStorage.getItem(storageKey) ?? productsPerBatch);
}
//para recuperar la cantidad de productos que se habían cargado si entras en uno y vuelves
export function storeVisibleProducts(grid: HTMLElement): void {
    const storageKey = `vis-prod:${location.pathname}${location.search}`;
    sessionStorage.setItem(storageKey, String(grid.children.length));
}
//recuperar el scrollY y aplicarlo en la ventana
export function getScrollY(): void {
    const scrollKey = `scroll:${location.pathname}${location.search}`;
    const savedScroll = sessionStorage.getItem(scrollKey);

    if (savedScroll !== null) {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: Number(savedScroll),
                behavior: "auto"
            });
        });
    }
}
//guardar la altura de la página si te metes en uno de los productos que no es de los 16 primeros
//los primeros 16 no generan problemas al cargarse directamente sin JavaScript
export function storeScrollY(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const card = target.closest<HTMLAnchorElement>(".card-link");
    if(!card) return;

    const scrollKey = `scroll:${location.pathname}${location.search}`;

    sessionStorage.setItem(scrollKey, String(window.scrollY));
}