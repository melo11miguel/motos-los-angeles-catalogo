import { notFound } from "next/navigation";
import Cabecera from "../../Cabecera";
import FormProducto from "../FormProducto";
import { sugerencias } from "../sugerencias";
import { borrarProducto } from "../../acciones";
import { obtenerProducto } from "@/lib/datos";
import BotonBorrar from "./BotonBorrar";

export const dynamic = "force-dynamic";

export default async function Editar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const producto = await obtenerProducto(id);
  if (!producto) notFound();
  const { nombres, marcas } = await sugerencias();
  return (
    <>
      <Cabecera />
      <main className="cont">
        <h1 className="titulo">Editar producto</h1>
        <FormProducto producto={producto} seccionInicial={producto.seccion} nombres={nombres} marcas={marcas} />
        <form action={borrarProducto} className="zona-borrar">
          <input type="hidden" name="id" value={producto.id} />
          <BotonBorrar />
        </form>
      </main>
    </>
  );
}
