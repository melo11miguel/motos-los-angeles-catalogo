import Cabecera from "../../Cabecera";
import FormProducto from "../FormProducto";
import { sugerencias } from "../sugerencias";
import { esSeccion } from "@/lib/secciones";

export const dynamic = "force-dynamic";

export default async function Nuevo({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { s } = await searchParams;
  const { nombres, marcas } = await sugerencias();
  return (
    <>
      <Cabecera />
      <main className="cont">
        <h1 className="titulo">Nuevo producto</h1>
        <FormProducto producto={null} seccionInicial={esSeccion(s) ? s : "cascos"} nombres={nombres} marcas={marcas} />
      </main>
    </>
  );
}
