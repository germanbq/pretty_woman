//guardar los filtros en la url
export function storeFiltersURL(filters: string[], order: string | undefined): void {
    const url = new URL(window.location.href);
    url.searchParams.delete("cate");
    filters.forEach((filter) => {
        url.searchParams.append("cate", filter);
    })

    url.searchParams.delete("order");
    if(order) url.searchParams.append("order", order);
    
    history.replaceState({}, "", url);
}
//recuperar filtros
export function getFiltersURL(select: HTMLSelectElement | null): boolean {
    const url = new URL(window.location.href);
    const urlFilters = url.searchParams.getAll("cate");
    let click = false;
    if(urlFilters.length > 0){
        const checkboxes = document.querySelector<HTMLDetailsElement>(".type-filters")?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        checkboxes?.forEach((cbox) => {
            cbox.checked = urlFilters.includes(cbox.value);
        })
        click = true;
    }

    const urlOrder = url.searchParams.get("order");
    if(urlOrder && select) {
        select.value = urlOrder;
        click = true;
    }
    return click;
}