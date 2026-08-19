import json
from collections import defaultdict
from pathlib import Path

ARCHIVO_PRODUCTOS = Path("src/data/products.json")
ARCHIVO_MARCAS = Path("src/data/brands.json")
ARCHIVO_SALIDA = Path("src/data/brands.json")


def leer_json(ruta: Path):
    with ruta.open("r", encoding="utf-8") as archivo:
        return json.load(archivo)


def main() -> None:
    productos = leer_json(ARCHIVO_PRODUCTOS)
    marcas = leer_json(ARCHIVO_MARCAS)

    if not isinstance(productos, list):
        raise ValueError(f"{ARCHIVO_PRODUCTOS} debe contener una lista.")
    if not isinstance(marcas, list):
        raise ValueError(f"{ARCHIVO_MARCAS} debe contener una lista.")

    recuento: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    nombres_originales: dict[str, str] = {}

    for producto in productos:
        marca = str(producto.get("brand") or "").strip()
        tipo = str(producto.get("type") or "").strip()

        if not marca or not tipo:
            continue

        clave_marca = marca.casefold()
        nombres_originales.setdefault(clave_marca, marca)
        recuento[clave_marca][tipo] += 1

    marcas_en_archivo: set[str] = set()

    for marca in marcas:
        nombre = str(marca.get("name") or "").strip()
        clave_marca = nombre.casefold()
        marcas_en_archivo.add(clave_marca)

        marca["products"] = {
            tipo: cantidad
            for tipo, cantidad in sorted(
                recuento.get(clave_marca, {}).items(),
                key=lambda elemento: elemento[0].casefold(),
            )
        }

    ARCHIVO_SALIDA.parent.mkdir(parents=True, exist_ok=True)
    with ARCHIVO_SALIDA.open("w", encoding="utf-8") as archivo:
        json.dump(marcas, archivo, ensure_ascii=False, indent=2)
        archivo.write("\n")

    print(f"Archivo creado correctamente: {ARCHIVO_SALIDA}")

    marcas_omitidas = [
        nombres_originales[clave]
        for clave in recuento
        if clave not in marcas_en_archivo
    ]
    if marcas_omitidas:
        print(
            "Aviso: estas marcas aparecen en products.json, pero no en brands.json: "
            + ", ".join(sorted(marcas_omitidas, key=str.casefold))
        )


if __name__ == "__main__":
    main()
