export const SECCIONES = {
  cascos: {
    nombre: "Cascos",
    categorias: { abierto: "Abierto", abatible: "Abatible", integral: "Integral" },
  },
  guantes: {
    nombre: "Guantes",
    categorias: { tela: "Tela", cuero: "Cuero", impermeable: "Impermeable", medio: "Medio dedo" },
  },
  intercomunicadores: {
    nombre: "Intercomunicadores",
    categorias: { bluetooth: "Bluetooth" },
  },
  impermeables: {
    nombre: "Impermeables",
    categorias: { sudadera: "Tipo sudadera", pvc: "PVC / resortado" },
  },
  chaquetas: {
    nombre: "Chaquetas",
    categorias: { cortaviento: "Cortaviento", rompeviento: "Rompeviento", termica: "Térmica" },
  },
} as const;

export type Seccion = keyof typeof SECCIONES;

export const LISTA_SECCIONES = Object.keys(SECCIONES) as Seccion[];

export function esSeccion(v: unknown): v is Seccion {
  return typeof v === "string" && v in SECCIONES;
}

export function categoriasDe(s: Seccion): Record<string, string> {
  return SECCIONES[s].categorias;
}

export const VARIABLE_SECCION: Record<Seccion, string> = {
  cascos: "CASCOS",
  guantes: "GUANTES",
  intercomunicadores: "INTERCOMUNICADORES",
  impermeables: "IMPERMEABLES",
  chaquetas: "CHAQUETAS",
};
