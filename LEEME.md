# Catálogo — Motos Los Ángeles

La página pública es la misma de siempre. Lo nuevo es que los productos, los precios,
las fotos y los datos del negocio ya no se editan en el código, sino desde un panel
en **`/admin`**, protegido con contraseña.

**Stack:** Next.js en Vercel · Neon (base de datos PostgreSQL gratis) · Vercel Blob (fotos).

---

## Publicarlo en Vercel (una sola vez)

1. En Vercel: **Add New → Project** e importa este repositorio.
2. En el proyecto, ve a **Storage → Create Database → Neon** (plan gratis) y conéctalo
   al proyecto. Vercel crea sola la variable `DATABASE_URL`.
3. En **Storage → Create → Blob**, crea un almacén con acceso **público** y conéctalo
   al proyecto. Vercel crea sola la variable `BLOB_READ_WRITE_TOKEN`.
4. En **Settings → Environment Variables**, agrega `ADMIN_PASSWORD` con una contraseña larga.
5. Vuelve a desplegar (**Deployments → Redeploy**).

La primera vez que alguien abre la página, la base de datos se crea sola y se cargan los
134 productos que tenía el catálogo, con sus fotos.

---

## Usar el panel (`tusitio.vercel.app/admin`)

- **Cambiar un precio:** escríbelo en la casilla del producto y toca **Guardar**.
  Puedes escribirlo con puntos (`350.000`). Si lo dejas vacío, sale «Por definir».
- **Agregar un producto:** **+ Agregar producto**, sube la foto desde el celular y llena los datos.
  La foto se reduce y se convierte a `.webp` antes de subirla, para que la página cargue rápido.
- **Varios colores en una misma tarjeta:** usa exactamente el mismo *Nombre o referencia*
  (el formulario te sugiere los que ya existen).
- **Ocultar** quita el producto del catálogo sin borrarlo. **Mostrar** lo devuelve.
- **↑ ↓** cambian el orden en que salen los productos («Orden sugerido»).
- **Datos del negocio:** WhatsApp, dirección, horario, Instagram y TikTok.

Los cambios se ven en la página apenas se guardan.

---

## Para desarrollar en tu computador

```bash
npm install
cp .env.example .env.local   # pon DATABASE_URL y ADMIN_PASSWORD
npm run dev
```

Sin `BLOB_READ_WRITE_TOKEN`, en desarrollo las fotos se guardan en `public/uploads/`.

## Dónde está cada cosa

```
public/                Página pública (index.html, css, js/app.js) y fotos originales
src/app/js/datos.js/   Genera los datos del catálogo desde la base de datos
src/app/admin/         Panel de administración
src/lib/db.ts          Conexión, creación de tablas y carga inicial
src/lib/seed.json      Los 134 productos originales (solo se usan la primera vez)
src/lib/secciones.ts   Secciones y categorías
```
