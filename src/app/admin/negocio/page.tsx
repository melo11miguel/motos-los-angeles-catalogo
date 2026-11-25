import Cabecera from "../Cabecera";
import FormNegocio from "./FormNegocio";
import { obtenerNegocio } from "@/lib/datos";

export const dynamic = "force-dynamic";

export default async function Negocio() {
  const negocio = await obtenerNegocio();
  return (
    <>
      <Cabecera />
      <main className="cont">
        <h1 className="titulo">Datos del negocio</h1>
        <FormNegocio negocio={negocio} />
      </main>
    </>
  );
}
