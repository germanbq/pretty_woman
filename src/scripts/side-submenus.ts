import { activateFocusTrap, deactivateFocusTrap } from "./focus-trap";

export function initSideSubmenus(): void { 
    const optSideMenu = document.querySelector<HTMLElement>("#opt-side-menu");
    //menú marcas
    const brandMenuButton = document.querySelector<HTMLButtonElement>("#brands-menu-button");
    const brandSideMenu = document.querySelector<HTMLElement>("#brands-side-menu");
    const brandMenuLeftButton = document.querySelector<HTMLElement>("#brand-menu-left-button");
    //menú tipos
    const typeMenuButton = document.querySelector<HTMLButtonElement>("#types-menu-button");
    const typeSideMenu = document.querySelector<HTMLElement>("#types-side-menu");
    const typeMenuLeftButton = document.querySelector<HTMLElement>("#type-menu-left-button");    
    //menú marcas
    brandMenuButton?.addEventListener("click", () => {
        if(!brandSideMenu) return;

        brandSideMenu.classList.toggle("open");
        brandSideMenu.toggleAttribute("inert");
        activateFocusTrap(brandSideMenu);
        const isOpenBrand = brandSideMenu.classList.contains("open");

        brandMenuButton.setAttribute("aria-expanded", String(isOpenBrand));
        brandMenuButton.setAttribute("aria-label",
            isOpenBrand ? "Cerrar menú" : "Abrir menú"
        );
    });
    brandMenuLeftButton?.addEventListener("click", () => {
        if(!brandSideMenu) return;

        brandSideMenu.classList.toggle("open");
        brandSideMenu.toggleAttribute("inert");
        deactivateFocusTrap();
        if(optSideMenu) activateFocusTrap(optSideMenu)
        brandMenuButton?.focus();
        const isOpenBrand = brandSideMenu.classList.contains("open");

        brandMenuButton?.setAttribute("aria-expanded", String(isOpenBrand));
        brandMenuButton?.setAttribute("aria-label",
            isOpenBrand ? "Cerrar menú" : "Abrir menú"
        );
    });   
    //menú tipos
    typeMenuButton?.addEventListener("click", () => {
        if(!typeSideMenu) return;

        typeSideMenu.classList.toggle("open");
        typeSideMenu.toggleAttribute("inert");
        activateFocusTrap(typeSideMenu);
        const isOpenType = typeSideMenu.classList.contains("open");

        typeMenuButton.setAttribute("aria-expanded", String(isOpenType));
        typeMenuButton.setAttribute("aria-label",
            isOpenType ? "Cerrar menú" : "Abrir menú"
        );
    });
    typeMenuLeftButton?.addEventListener("click", () => {
        if(!typeSideMenu) return;

        typeSideMenu.classList.toggle("open");
        typeSideMenu.toggleAttribute("inert");
        deactivateFocusTrap();
        if(optSideMenu) activateFocusTrap(optSideMenu)
        typeMenuButton?.focus();
        const isOpenType = typeSideMenu.classList.contains("open");

        typeMenuButton?.setAttribute("aria-expanded", String(isOpenType));
        typeMenuButton?.setAttribute("aria-label",
            isOpenType ? "Cerrar menú" : "Abrir menú"
        );
    });
} 
