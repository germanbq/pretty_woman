import { deactivateFocusTrap } from "./focus-trap";

export function closeAllMenus(currentMenu: HTMLElement | null): void {
    const menus = document.querySelectorAll<HTMLElement>(
        ".opt-side-menu, .side-submenus, .sch-side-menu, .filters-menu"
    );

    menus.forEach((menu) => {
        if (menu === currentMenu || !menu.classList.contains("open")) return;

        menu.classList.remove("open");
        menu.inert = true;
        deactivateFocusTrap();

        const menuButtons: Record<string, { buttonId: string; openLabel: string }> = {
            "opt-side-menu": {
                buttonId: "opt-menu-button",
                openLabel: "Abrir menú de opciones",
            },
            "sch-side-menu": {
                buttonId: "sch-menu-button",
                openLabel: "Abrir menú de búsqueda",
            },
            "filters-menu": {
                buttonId: "filter-button",
                openLabel: "Abrir menú de filtros",
            },
            "brands-side-menu": {
                buttonId: "brands-menu-button",
                openLabel: "Abrir menú de marcas",
            },
            "types-side-menu": {
                buttonId: "types-menu-button",
                openLabel: "Abrir menú de tipos de producto",
            },
        };

        const menuButton = menuButtons[menu.id];
        if(!menuButton) return;

        const button = document.querySelector<HTMLButtonElement>(
            `#${menuButton.buttonId}`
        );

        button?.setAttribute("aria-expanded", "false");
        button?.setAttribute("aria-label", menuButton.openLabel);

        if(menu.id === "opt-side-menu") {
            const icon = button?.querySelector<HTMLElement>("i");
            icon?.classList.add("fa-bars");
            icon?.classList.remove("bi-x-lg");
        }

        if(menu.id === "sch-side-menu") {
            const icon = button?.querySelector<HTMLElement>("i");
            icon?.classList.add("fa-magnifying-glass");
            icon?.classList.remove("bi-x-lg");
        }

        if(menu.id === "filters-menu") {
            const details = document.querySelector<HTMLDetailsElement>(".type-filters");
            details?.removeAttribute("open");
        }
    });
}
