# Catálogo de Cascos — Motos Los Ángeles

## Cómo abrirlo
Doble clic en **`index.html`**. Funciona sin internet y sin instalar nada.

Para enviarlo a un cliente: comprime **toda la carpeta** en .zip.
(Si mandas solo el `index.html` no se ven las fotos — necesita la carpeta `img`.)

---

## Cómo editar precios y nombres

Todo está en un solo archivo: **`js/datos.js`**. Ábrelo con el Bloc de notas.

Cada casco es una línea así:

```js
{ id: "shaft226", nombre: "SHAFT 226 Abierto", version: "Azul Pro",
  precio: 350000, categoria: "abierto", marca: "SHAFT", img: "IMG_8399.webp" },
```

| Campo       | Qué hace                                                        |
|-------------|-----------------------------------------------------------------|
| `nombre`    | Título grande de la tarjeta                                     |
| `version`   | Color o acabado (línea gris debajo del nombre)                  |
| `precio`    | Precio de salida, **sin puntos ni $** → `350000`                 |
| `categoria` | `"abierto"`, `"abatible"` o `"integral"` — decide en qué botón de filtro aparece |
| `marca`     | Solo aparece como texto pequeño bajo el nombre (ya no se filtra por marca) |
| `img`       | Nombre del archivo dentro de la carpeta `img`                   |
| `destacado` | `destacado: true` pone la etiqueta azul DESTACADO               |
| `nino`      | `nino: true` pone la etiqueta verde NIÑO                        |
| `activo`    | `activo: false` oculta el casco sin borrarlo                    |

Guarda el archivo y refresca la página (F5). Listo.

### Agregar un casco nuevo
1. Pon la foto en la carpeta `img` (formato `.webp`, `.jpg` o `.png`).
2. Copia una línea completa de las de arriba, pégala debajo y cámbiale
   el `id` (tiene que ser distinto a todos los demás), el nombre y la foto.

### Cambiar el WhatsApp o el horario
Está arriba del todo en `js/datos.js`, en el bloque `NEGOCIO`.
El número va con indicativo y sin `+` ni espacios: `573108050876`.

---

## Qué trae el catálogo
- Un solo catálogo con 4 botones de filtro: **Todos / Integral / Abierto / Abatible**.
- Buscador por modelo o marca, y orden por precio.
- Clic en cualquier tarjeta → foto grande. Se pasa con las flechas ← → del
  teclado o deslizando el dedo en el celular.
- Botón de WhatsApp en cada casco: abre el chat con el mensaje del modelo y
  el precio ya escritos.
- Se adapta a celular, tablet y computador.
- `Ctrl + P` imprime el catálogo en 3 columnas, sin menús ni animaciones.

---

## Fotos
Las 40 fotos originales `.HEIC` de la carpeta `Cascos` del escritorio se
convirtieron a `.webp` (máx. 1200 px, ~80 KB cada una). Los originales
siguen intactos donde estaban.
