export const COOKIE_SESION = "mla_admin";
const DURACION_S = 60 * 60 * 24 * 30;

function secreto(): string {
  const s = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("Falta ADMIN_PASSWORD en las variables de entorno.");
  return "mla-sesion:" + s;
}

function b64url(buf: ArrayBuffer): string {
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function firmar(texto: string): Promise<string> {
  const clave = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secreto()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return b64url(await crypto.subtle.sign("HMAC", clave, new TextEncoder().encode(texto)));
}

function iguales(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function crearSesion(): Promise<{ valor: string; maxAge: number }> {
  const vence = Math.floor(Date.now() / 1000) + DURACION_S;
  return { valor: `${vence}.${await firmar("admin:" + vence)}`, maxAge: DURACION_S };
}

export async function sesionValida(valor: string | undefined): Promise<boolean> {
  if (!valor) return false;
  const [vence, firma] = valor.split(".");
  if (!vence || !firma || !/^\d+$/.test(vence)) return false;
  if (Number(vence) < Date.now() / 1000) return false;
  try {
    return iguales(firma, await firmar("admin:" + vence));
  } catch {
    return false;
  }
}

export async function claveCorrecta(intento: string): Promise<boolean> {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const [a, b] = await Promise.all([firmar("clave:" + intento), firmar("clave:" + real)]);
  return iguales(a, b);
}
