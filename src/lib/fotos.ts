import "server-only";
import { put, del } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

const TIPOS: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};
const MAX_BYTES = 4 * 1024 * 1024;

const fotosLocales = () =>
  !process.env.VERCEL && (process.env.NODE_ENV !== "production" || process.env.FOTOS_LOCALES === "1");

export async function guardarFoto(archivo: File): Promise<string> {
  const ext = TIPOS[archivo.type];
  if (!ext) throw new Error("La foto debe ser JPG, PNG o WEBP.");
  if (archivo.size > MAX_BYTES) throw new Error("La foto pesa más de 4 MB.");
  const nombre = `productos/${randomUUID()}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const r = await put(nombre, archivo, { access: "public", contentType: archivo.type });
    return r.url;
  }
  if (!fotosLocales()) {
    throw new Error("Falta conectar Vercel Blob al proyecto para poder subir fotos.");
  }
  const destino = path.join(process.cwd(), "public", "uploads", nombre);
  await mkdir(path.dirname(destino), { recursive: true });
  await writeFile(destino, Buffer.from(await archivo.arrayBuffer()));
  return `/uploads/${nombre}`;
}

export async function borrarFoto(url: string | null) {
  if (!url) return;
  try {
    if (/\.blob\.vercel-storage\.com\//.test(url) && process.env.BLOB_READ_WRITE_TOKEN) {
      await del(url);
    } else if (url.startsWith("/uploads/") && fotosLocales()) {
      await unlink(path.join(process.cwd(), "public", url));
    }
  } catch {
    /* si no se pudo borrar, no bloquea el guardado */
  }
}
