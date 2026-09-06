const focusableElementsSelector = `a[href], button:not([disabled]), input:not([disabled]),
    select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`;

let removeFocusTrap: (() => void) | undefined;

function getFocusableElements(menu: HTMLElement): HTMLElement[] {
    return Array.from(menu.querySelectorAll<HTMLElement>(focusableElementsSelector)).filter(
        (element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
}

function getMenuButton(menu: HTMLElement): HTMLButtonElement | null {
    if (menu.id === "sch-side-menu") return document.querySelector("#sch-menu-button");
    if (menu.id === "opt-side-menu") return document.querySelector("#opt-menu-button");
    return null;
}

function focusFirstElement(menu: HTMLElement): void {
    getFocusableElements(menu)[0]?.focus();
}

function trapFocus(menu: HTMLElement, menuButton: HTMLButtonElement | null, event: KeyboardEvent): void {
    if (event.key !== "Tab") return;

    const focusableElements = getFocusableElements(menu);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if(!firstElement || !lastElement) return;

    const activeElement = document.activeElement;
    //menús de búsqueda y opciones con botón externo
    if(menuButton) {
        if(event.shiftKey && activeElement === firstElement) {
            event.preventDefault();
            menuButton.focus();
        }
        else if(event.shiftKey && activeElement === menuButton) {
            event.preventDefault();
            lastElement.focus();
        }
        else if(!event.shiftKey && activeElement === lastElement) {
            event.preventDefault();
            menuButton.focus();
        }
        else if(!event.shiftKey && activeElement === menuButton) {
            event.preventDefault();
            firstElement.focus();
        }
        return;
    }
    //menús sin botón externo
    if(event.shiftKey &&activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } 
    else if(!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}

export function deactivateFocusTrap(): void {
    removeFocusTrap?.();
    removeFocusTrap = undefined;
}

export function activateFocusTrap(menu: HTMLElement): void {
    deactivateFocusTrap();

    const menuButton = getMenuButton(menu);

    const handleKeyDown = (event: KeyboardEvent) => {
        trapFocus(menu, menuButton, event);
    };

    menu.addEventListener("keydown", handleKeyDown);

    if (menuButton && !menu.contains(menuButton)) menuButton.addEventListener("keydown", handleKeyDown);

    focusFirstElement(menu);

    removeFocusTrap = () => {
        menu.removeEventListener("keydown", handleKeyDown);
        if (menuButton && !menu.contains(menuButton)) menuButton.removeEventListener("keydown", handleKeyDown);
    };
}