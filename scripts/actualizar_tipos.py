import json
from collections import defaultdict
from pathlib import Path

ARCHIVO_PRODUCTOS = Path("src/data/products.json")
ARCHIVO_TIPOS = Path("src/data/product-types.json")
ARCHIVO_SALIDA = Path("src/data/product-types.json")

def leer_json(ruta: Path):
    with ruta.open("r", encoding="utf-8") as archivo:
        return json.load(archivo)


def main() -> None:
    productos = leer_json(ARCHIVO_PRODUCTOS)
    tipos = leer_json(ARCHIVO_TIPOS)

    if not isinstance(productos, list):
        raise ValueError(f"{ARCHIVO_PRODUCTOS} debe contener una lista.")
    if not isinstance(tipos, list):
        raise ValueError(f"{ARCHIVO_TIPOS} debe contener una lista.")

    recuento: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    nombres_originales: dict[str, str] = {}

    for producto in productos:
        tipo = str(producto.get("type") or "").strip()
        marca = str(producto.get("brand") or "").strip()

        if not tipo or not marca:
            continue

        clave_tipo = tipo.casefold()
        nombres_originales.setdefault(clave_tipo, tipo)
        recuento[clave_tipo][marca] += 1

    tipos_en_archivo: set[str] = set()

    for tipo in tipos:
        nombre = str(tipo.get("name") or "").strip()
        clave_tipo = nombre.casefold()
        tipos_en_archivo.add(clave_tipo)

        tipo["products"] = {
            marca: cantidad
            for marca, cantidad in sorted(
                recuento.get(clave_tipo, {}).items(),
                key=lambda elemento: elemento[0].casefold(),
            )
        }

    ARCHIVO_SALIDA.parent.mkdir(parents=True, exist_ok=True)
    with ARCHIVO_SALIDA.open("w", encoding="utf-8") as archivo:
        json.dump(tipos, archivo, ensure_ascii=False, indent=2)
        archivo.write("\n")

    print(f"Archivo creado correctamente: {ARCHIVO_SALIDA}")

    tipos_omitidos = [
        nombres_originales[clave]
        for clave in recuento
        if clave not in tipos_en_archivo
    ]
    if tipos_omitidos:
        print(
            "Aviso: estos tipos aparecen en products.json, pero no en "
            "product-types.json: "
            + ", ".join(sorted(tipos_omitidos, key=str.casefold))
        )


if __name__ == "__main__":
    main()
