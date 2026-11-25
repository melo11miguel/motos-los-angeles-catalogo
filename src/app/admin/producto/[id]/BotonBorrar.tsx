"use client";

export default function BotonBorrar() {
  return (
    <button
      className="btn btn--peligro"
      onClick={(e) => {
        if (!confirm("¿Borrar este producto? Si solo quieres que no se vea, mejor usa «Ocultar».")) e.preventDefault();
      }}
    >
      Borrar producto
    </button>
  );
}
