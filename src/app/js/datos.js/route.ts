import { catalogoPublico } from "@/lib/datos";
import { LISTA_SECCIONES, VARIABLE_SECCION } from "@/lib/secciones";

export const dynamic = "force-dynamic";

const seguro = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c");

export async function GET() {
  const { negocio, productos } = await catalogoPublico();
  const lineas = [`const NEGOCIO = ${seguro(negocio)};`];
  for (const s of LISTA_SECCIONES) {
    const lista = productos
      .filter((p) => p.seccion === s)
      .map(({ id, nombre, version, precio, categoria, marca, img, destacado, nino }) => ({
        id, nombre, version, precio, categoria, marca, img, destacado, nino,
      }));
    lineas.push(`const ${VARIABLE_SECCION[s]} = ${seguro(lista)};`);
  }
  return new Response(lineas.join("\n"), {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
