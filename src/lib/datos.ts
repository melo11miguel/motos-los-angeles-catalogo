import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { listo, sql } from "./db";
import type { Seccion } from "./secciones";

export type Producto = {
  id: string;
  seccion: Seccion;
  nombre: string;
  version: string;
  precio: number | null;
  categoria: string;
  marca: string;
  img: string | null;
  destacado: boolean;
  nino: boolean;
  activo: boolean;
  orden: number;
};

export type Negocio = {
  nombre: string;
  eslogan: string;
  whatsapp: string;
  direccion: string;
  horario: string;
  instagram: string;
  tiktok: string;
};

export const TAG_CATALOGO = "catalogo";

export async function listarProductos(seccion?: Seccion): Promise<Producto[]> {
  await listo();
  const db = sql();
  const filas = seccion
    ? await db<Producto[]>`
        select id, seccion, nombre, version, precio, categoria, marca, img, destacado, nino, activo, orden
        from productos where seccion = ${seccion} order by orden, creado`
    : await db<Producto[]>`
        select id, seccion, nombre, version, precio, categoria, marca, img, destacado, nino, activo, orden
        from productos order by seccion, orden, creado`;
  return [...filas];
}

export async function obtenerProducto(id: string): Promise<Producto | null> {
  await listo();
  const [p] = await sql()<Producto[]>`
    select id, seccion, nombre, version, precio, categoria, marca, img, destacado, nino, activo, orden
    from productos where id = ${id}`;
  return p ?? null;
}

export async function obtenerNegocio(): Promise<Negocio> {
  await listo();
  const [fila] = await sql()<{ valor: Negocio }[]>`select valor from ajustes where clave = 'negocio'`;
  return fila.valor;
}

export const catalogoPublico = unstable_cache(
  async () => {
    const [negocio, productos] = await Promise.all([obtenerNegocio(), listarProductos()]);
    return { negocio, productos: productos.filter((p) => p.activo) };
  },
  ["catalogo-publico"],
  { tags: [TAG_CATALOGO], revalidate: 3600 },
);

export function refrescarCatalogo() {
  revalidateTag(TAG_CATALOGO);
}
