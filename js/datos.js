/* ============================================================================
   MOTOS LOS ÁNGELES · Catálogo de Cascos
   ---------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR.

   Para cambiar un precio  -> edita el número en "precio" (sin puntos ni $).
   Para cambiar un nombre  -> edita "nombre".
   Para agregar un casco   -> copia un bloque { ... }, y pega la foto .webp
                              dentro de la carpeta /img.
   Para ocultar un casco   -> agrega   activo: false,

   categoria: "abierto" | "abatible" | "integral"
   ========================================================================= */

/* --- Datos del negocio ---------------------------------------------------- */
const NEGOCIO = {
  nombre: "MOTOS LOS ÁNGELES",
  eslogan: "Cascos certificados · Protección que se siente",

  // ⚠️ CAMBIA ESTE NÚMERO por el WhatsApp real del local.
  // Formato: código de país + número, sin +, sin espacios. Colombia = 57.
  whatsapp: "573213701476",

  direccion: "Calle 17 #15-18, al frente a Mundimotos",
  horario: "Lun a Sáb · 9:00 a.m. – 7:00 p.m.",
};

/* --- Inventario ----------------------------------------------------------
   Precios en pesos colombianos (precio de salida tomado de motos.xlsx,
   hoja CASCO, columna C_P_salida).
--------------------------------------------------------------------------- */
const CASCOS = [

  /* ===================== ABIERTOS ===================== */
  { id: "nino-abierto-azul", nombre: "Niño Casco Abierto", version: "Azul", precio: 100000, categoria: "abierto", marca: "POR DEFINIR", img: "IMG_8428.webp", nino: true },
  { id: "nino-abierto-rosa", nombre: "Niño Casco Abierto", version: "Rosa", precio: 100000, categoria: "abierto", marca: "POR DEFINIR", img: "IMG_8429.webp", nino: true },
  { id: "shaft226",       nombre: "SHAFT 226 Abierto", version: "Azul Pro", precio: 350000, categoria: "abierto", marca: "SHAFT", img: "IMG_8399.webp", destacado: true },
  { id: "tech-blanco",    nombre: "Abierto TECH", version: "Blanco Perla", precio: 120000, categoria: "abierto", marca: "TECH", img: "IMG_8415.webp" },
  { id: "tech-lila",      nombre: "Abierto TECH", version: "Lila Mate", precio: 120000, categoria: "abierto", marca: "TECH", img: "IMG_8416.webp" },

  /* ===================== ABATIBLES ==================== */
  { id: "xone-abatible",  nombre: "XONE Abatible", version: "Azul Cielo Mate", precio: 190000, categoria: "abatible", marca: "XONE", img: "IMG_8412.webp" },
  { id: "tatu-azul",      nombre: "Niño Abatible TATTOO", version: "Racing Azul", precio: 150000, categoria: "abatible", marca: "TATTOO", img: "IMG_8417.webp", nino: true },
  { id: "tatu-rosa",      nombre: "Niño Abatible TATTOO", version: "Unicornio Rosa", precio: 150000, categoria: "abatible", marca: "TATTOO", img: "IMG_8418.webp", nino: true },
  { id: "ich3110-bn",     nombre: "ICH Abatible 3110", version: "Negro / Blanco", precio: 160000, categoria: "abatible", marca: "ICH", img: "IMG_8419.webp" },
  { id: "ich3120-negro",  nombre: "ICH Abatible 3120", version: "Negro Brillante", precio: 210000, categoria: "abatible", marca: "ICH", img: "IMG_8420.webp" },
  { id: "ich3120-verde",  nombre: "ICH Abatible 3120", version: "Verde Neón", precio: 210000, categoria: "abatible", marca: "ICH", img: "IMG_8425.webp" },
  { id: "ich3120-morado", nombre: "ICH Abatible 3120", version: "Morado", precio: 210000, categoria: "abatible", marca: "ICH", img: "IMG_8421.webp" },

  /* ===================== INTEGRALES =================== */
  { id: "ich501-freeway", nombre: "ICH 501", version: "Freeway Neón", precio: 150000, categoria: "integral", marca: "ICH", img: "IMG_8378.webp", destacado: true },
  { id: "ich501-highway", nombre: "ICH 501", version: "The Highway Rosa", precio: 150000, categoria: "integral", marca: "ICH", img: "IMG_8380.webp" },
  { id: "spartan",        nombre: "SPARTAN", version: "Blanco Perla", precio: 400000, categoria: "integral", marca: "SPARTAN", img: "IMG_8408.webp", destacado: true },
  { id: "ich503-burst",   nombre: "ICH 503", version: "Burst Mode", precio: 200000, categoria: "integral", marca: "ICH", img: "IMG_8427.webp", destacado: true },
  { id: "nino-spider",    nombre: "Niño Certificado", version: "Spider Rojo", precio: 110000, categoria: "integral", marca: "ICH", img: "IMG_8382.webp", nino: true },
  { id: "nino-kitty",     nombre: "Niño Certificado", version: "Hello Kitty", precio: 110000, categoria: "integral", marca: "ICH", img: "IMG_8384.webp", nino: true },
  { id: "xone-bornwin",   nombre: "XONE Integral", version: "Born To Win Azul", precio: 200000, categoria: "integral", marca: "XONE", img: "IMG_8385.webp" },

  { id: "xone-integral",  nombre: "XONE Integral", version: "Verde Militar Mate", precio: 200000, categoria: "integral", marca: "XONE", img: "IMG_8390.webp" },

  { id: "edge-mate",      nombre: "EDGE Negro Mate", version: "Black Series", precio: 350000, categoria: "integral", marca: "EDGE", img: "IMG_8391.webp", destacado: true },
  { id: "edge-color",     nombre: "EDGE Color", version: "Azul / Rojo", precio: 380000, categoria: "integral", marca: "EDGE", img: "IMG_8392.webp" },

  { id: "m57-brillante",  nombre: "XSPORTS M57", version: "Negro Brillante", precio: 350000, categoria: "integral", marca: "XSPORTS", img: "IMG_8393.webp" },
  { id: "m57-mate",       nombre: "XSPORTS M57", version: "Negro Mate", precio: 350000, categoria: "integral", marca: "XSPORTS", img: "IMG_8401.webp" },
  { id: "m57-iridium",    nombre: "XSPORTS M57", version: "Iridium", precio: 350000, categoria: "integral", marca: "XSPORTS", img: "IMG_8410.webp" },

  { id: "shaft598-gris",  nombre: "SHAFT 598 GTR", version: "Blanco / Gris", precio: 450000, categoria: "integral", marca: "SHAFT", img: "IMG_8395.webp", destacado: true },
  { id: "shaft598-neon",  nombre: "SHAFT 598 GTR", version: "Gris / Neón", precio: 450000, categoria: "integral", marca: "SHAFT", img: "IMG_8407.webp" },
  { id: "hro502-verde",   nombre: "HRO", version: "Verde Militar Mate", precio: 320000, categoria: "integral", marca: "HRO", img: "IMG_8396.webp" },
  { id: "hro502-bco",     nombre: "HRO", version: "Blanco Perla", precio: 320000, categoria: "integral", marca: "HRO", img: "IMG_8397.webp" },
  { id: "shaft526-mor",   nombre: "SHAFT 526", version: "Street Racing Morado", precio: 420000, categoria: "integral", marca: "SHAFT", img: "IMG_8400.webp" },
  { id: "shaft526-azul",  nombre: "SHAFT 526", version: "Azul / Blanco", precio: 420000, categoria: "integral", marca: "SHAFT", img: "IMG_8403.webp" },
  { id: "shaft610-pro",   nombre: "SHAFT PRO 610", version: "Pro Series", precio: 550000, categoria: "integral", marca: "SHAFT", img: "IMG_8402.webp", destacado: true },
  { id: "shaft610-multi", nombre: "SHAFT PRO 610", version: "Multicolor", precio: 550000, categoria: "integral", marca: "SHAFT", img: "IMG_8406.webp" },
  { id: "shaft609",       nombre: "SHAFT PRO Venon 609", version: "Astro Azul", precio: 500000, categoria: "integral", marca: "SHAFT", img: "IMG_8404.webp" },

  { id: "mellos-sr71",    nombre: "Moto Mellos SR71", version: "Negro Mate", precio: 420000, categoria: "integral", marca: "SR71", img: "IMG_8405.webp" },
  { id: "mellos-plata",   nombre: "Moto Mellos HRO", version: "Plata", precio: 430000, categoria: "integral", marca: "HRO", img: "IMG_8409.webp" },
  { id: "mellos-mate",    nombre: "Moto Mellos HRO", version: "Negro Mate", precio: 430000, categoria: "integral", marca: "HRO", img: "IMG_8413.webp" },

  { id: "ls2-stream",     nombre: "LS2 Stream II", version: "Negro Brillante", precio: 580000, categoria: "integral", marca: "LS2", img: "IMG_8411.webp", destacado: true },

  { id: "ich503-negro",   nombre: "ICH 503", version: "Negro / Fucsia", precio: 200000, categoria: "integral", marca: "ICH", img: "IMG_8426.webp" },

  { id: "voss-negro",     nombre: "VOSSDOT", version: "Negro Brillante", precio: 300000, categoria: "integral", marca: "VOSSDOT", img: "IMG_8422.webp" },
  { id: "voss-morado",    nombre: "VOSSDOT", version: "Negro / Morado", precio: 300000, categoria: "integral", marca: "VOSSDOT", img: "IMG_8423.webp" },
  { id: "voss-multi",     nombre: "VOSSDOT Multipropósito", version: "Carbono", precio: 350000, categoria: "integral", marca: "VOSSDOT", img: "IMG_8424.webp", destacado: true },
  { id: "multi-project",  nombre: "Multipropósito Project", version: "Negro Mate", precio: 280000, categoria: "integral", marca: "PROJECT", img: "IMG_8430.webp" },
];
