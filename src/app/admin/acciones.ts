"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { listo, sql } from "@/lib/db";
import { obtenerProducto, refrescarCatalogo, type Negocio } from "@/lib/datos";
import { borrarFoto, guardarFoto } from "@/lib/fotos";
import { COOKIE_SESION, claveCorrecta, crearSesion, sesionValida } from "@/lib/sesion";
import { categoriasDe, esSeccion } from "@/lib/secciones";

async function exigirAdmin() {
  const c = await cookies();
  if (!(await sesionValida(c.get(COOKIE_SESION)?.value))) redirect("/admin/entrar");
  await listo();
}

function texto(fd: FormData, campo: string): string {
  const v = fd.get(campo);
  return typeof v === "string" ? v.trim() : "";
}

function precioDe(v: string): number | null {
  const digitos = v.replace(/\D/g, "");
  if (!digitos) return null;
  const n = Number(digitos);
  if (!Number.isSafeInteger(n) || n > 100_000_000) throw new Error("Precio no válido.");
  return n;
}

function hecho() {
  refrescarCatalogo();
  revalidatePath("/admin", "layout");
}

export type Resultado = { error?: string; ok?: boolean; seccion?: string };

export async function entrar(_prev: Resultado, fd: FormData): Promise<Resultado> {
  if (!process.env.ADMIN_PASSWORD) return { error: "Falta configurar ADMIN_PASSWORD en Vercel." };
  if (!(await claveCorrecta(texto(fd, "clave")))) {
    await new Promise((r) => setTimeout(r, 800));
    return { error: "Contraseña incorrecta." };
  }
  const s = await crearSesion();
  (await cookies()).set(COOKIE_SESION, s.valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: s.maxAge,
  });
  redirect("/admin");
}

export async function salir() {
  (await cookies()).delete(COOKIE_SESION);
  redirect("/admin/entrar");
}

const esquemaProducto = z.object({
  seccion: z.string().refine(esSeccion, "Sección no válida."),
  categoria: z.string().min(1, "Elige una categoría."),
  nombre: z.string().min(1, "Escribe el nombre.").max(120),
  version: z.string().max(120),
  marca: z.string().max(60),
});

function nuevoId(nombre: string, version: string): string {
  const base = `${nombre} ${version}`
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${base || "producto"}-${randomBytes(3).toString("hex")}`;
}

export async function guardarProducto(fd: FormData): Promise<Resultado> {
  await exigirAdmin();
  const datos = esquemaProducto.safeParse({
    seccion: texto(fd, "seccion"),
    categoria: texto(fd, "categoria"),
    nombre: texto(fd, "nombre"),
    version: texto(fd, "version"),
    marca: texto(fd, "marca").toUpperCase(),
  });
  if (!datos.success) return { error: datos.error.issues[0]?.message ?? "Datos no válidos." };
  const d = datos.data;
  if (!esSeccion(d.seccion) || !(d.categoria in categoriasDe(d.seccion))) {
    return { error: "La categoría no corresponde a la sección." };
  }

  let precio: number | null;
  try {
    precio = precioDe(texto(fd, "precio"));
  } catch (e) {
    return { error: (e as Error).message };
  }
  const destacado = fd.get("destacado") === "on";
  const nino = fd.get("nino") === "on";
  const activo = fd.get("activo") === "on";

  const id = texto(fd, "id");
  const anterior = id ? await obtenerProducto(id) : null;
  if (id && !anterior) return { error: "El producto ya no existe." };

  let img = anterior?.img ?? null;
  let fotoVieja: string | null = null;
  const foto = fd.get("foto");
  if (foto instanceof File && foto.size > 0) {
    try {
      img = await guardarFoto(foto);
    } catch (e) {
      return { error: (e as Error).message };
    }
    fotoVieja = anterior?.img ?? null;
  } else if (fd.get("quitar_foto") === "on") {
    fotoVieja = img;
    img = null;
  }

  const db = sql();
  if (anterior) {
    await db`
      update productos set
        seccion = ${d.seccion}, categoria = ${d.categoria}, nombre = ${d.nombre},
        version = ${d.version}, marca = ${d.marca}, precio = ${precio}, img = ${img},
        destacado = ${destacado}, nino = ${nino}, activo = ${activo}, actualizado = now()
      where id = ${anterior.id}`;
  } else {
    await db`
      insert into productos (id, seccion, categoria, nombre, version, marca, precio, img, destacado, nino, activo, orden)
      values (
        ${nuevoId(d.nombre, d.version)}, ${d.seccion}, ${d.categoria}, ${d.nombre}, ${d.version},
        ${d.marca}, ${precio}, ${img}, ${destacado}, ${nino}, ${activo},
        (select coalesce(max(orden), 0) + 10 from productos where seccion = ${d.seccion})
      )`;
  }
  if (fotoVieja && fotoVieja !== img) await borrarFoto(fotoVieja);
  hecho();
  return { ok: true, seccion: d.seccion };
}

export async function cambiarPrecio(fd: FormData) {
  await exigirAdmin();
  let precio: number | null;
  try {
    precio = precioDe(texto(fd, "precio"));
  } catch {
    return;
  }
  await sql()`update productos set precio = ${precio}, actualizado = now() where id = ${texto(fd, "id")}`;
  hecho();
}

export async function alternarVisible(fd: FormData) {
  await exigirAdmin();
  await sql()`update productos set activo = not activo, actualizado = now() where id = ${texto(fd, "id")}`;
  hecho();
}

export async function mover(fd: FormData) {
  await exigirAdmin();
  const id = texto(fd, "id");
  const arriba = texto(fd, "dir") === "arriba";
  await sql().begin(async (tx) => {
    const [p] = await tx<{ seccion: string; orden: number }[]>`
      select seccion, orden from productos where id = ${id} for update`;
    if (!p) return;
    const [vecino] = arriba
      ? await tx<{ id: string; orden: number }[]>`
          select id, orden from productos where seccion = ${p.seccion} and (orden, id) < (${p.orden}, ${id})
          order by orden desc, id desc limit 1 for update`
      : await tx<{ id: string; orden: number }[]>`
          select id, orden from productos where seccion = ${p.seccion} and (orden, id) > (${p.orden}, ${id})
          order by orden, id limit 1 for update`;
    if (!vecino) return;
    const nuevoP = vecino.orden === p.orden ? (arriba ? p.orden - 1 : p.orden + 1) : vecino.orden;
    await tx`update productos set orden = ${p.orden} where id = ${vecino.id}`;
    await tx`update productos set orden = ${nuevoP} where id = ${id}`;
  });
  hecho();
}

export async function borrarProducto(fd: FormData) {
  await exigirAdmin();
  const p = await obtenerProducto(texto(fd, "id"));
  if (!p) redirect("/admin");
  await sql()`delete from productos where id = ${p.id}`;
  await borrarFoto(p.img);
  hecho();
  redirect(`/admin?s=${p.seccion}&msg=borrado`);
}

const esquemaNegocio = z.object({
  nombre: z.string().min(1, "Escribe el nombre del negocio.").max(80),
  eslogan: z.string().max(160),
  whatsapp: z.string().regex(/^\d{10,15}$/, "El WhatsApp va con indicativo y solo números, ej: 573138165217."),
  direccion: z.string().max(160),
  horario: z.string().max(160),
  instagram: z.string().max(60),
  tiktok: z.string().max(60),
});

export async function guardarNegocio(_prev: Resultado, fd: FormData): Promise<Resultado> {
  await exigirAdmin();
  const limpio = (v: string) => v.replace(/^@/, "").replace(/^https?:\/\/[^/]+\/@?/, "").replace(/\/$/, "");
  const r = esquemaNegocio.safeParse({
    nombre: texto(fd, "nombre"),
    eslogan: texto(fd, "eslogan"),
    whatsapp: texto(fd, "whatsapp").replace(/\D/g, ""),
    direccion: texto(fd, "direccion"),
    horario: texto(fd, "horario"),
    instagram: limpio(texto(fd, "instagram")),
    tiktok: limpio(texto(fd, "tiktok")),
  });
  if (!r.success) return { error: r.error.issues[0]?.message ?? "Datos no válidos." };
  const valor: Negocio = r.data;
  await sql()`
    insert into ajustes (clave, valor) values ('negocio', ${sql().json(valor)})
    on conflict (clave) do update set valor = excluded.valor`;
  hecho();
  return { ok: true };
}
