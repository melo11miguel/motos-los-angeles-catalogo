/* ============================================================================
   MOTOS LOS ÁNGELES · Catálogo
   ---------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR.

   Para cambiar un precio  -> edita el número en "precio" (sin puntos ni $).
   Para cambiar un nombre  -> edita "nombre".
   Para agregar algo       -> copia un bloque { ... }, y pega la foto .webp
                              en la carpeta que corresponda.
   Para ocultarlo          -> agrega   activo: false,

   CASCOS  -> fotos en la carpeta /cascos
              categoria: "abierto" | "abatible" | "integral"

   GUANTES -> fotos en la carpeta /guantes
              categoria: "tela" | "cuero" | "impermeable" | "medio"
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

  { id: "shaft502-gris",  nombre: "SHAFT 502", version: "Blanco / Gris", precio: 350000, categoria: "integral", marca: "SHAFT", img: "IMG_8395.webp", destacado: true },
  { id: "shaft598-neon",  nombre: "SHAFT 598 GTR", version: "Gris / Neón", precio: 450000, categoria: "integral", marca: "SHAFT", img: "IMG_8407.webp" },
  { id: "shaft502-negro", nombre: "SHAFT 502", version: "Negro / Rosa", precio: 350000, categoria: "integral", marca: "SHAFT", img: "IMG_8396.webp" },
  { id: "xtrong-bco",     nombre: "XTRONG", version: "Blanco Perla", precio: 400000, categoria: "integral", marca: "XTRONG", img: "IMG_8397.webp" },
  { id: "shaft526-mor",   nombre: "SHAFT PRO SERIES", version: "Street Racing Morado", precio: 420000, categoria: "integral", marca: "SHAFT", img: "IMG_8400.webp" },
  { id: "shaft526-azul",  nombre: "SHAFT PRO SERIES", version: "Azul / Blanco", precio: 420000, categoria: "integral", marca: "SHAFT", img: "IMG_8403.webp" },
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


/* ============================================================================
   GUANTES · fotos en la carpeta /guantes
   Precios de motos.xlsx, hoja GUANTES, columna P_salida.
   categoria: "tela" | "cuero" | "impermeable" | "medio"
   ========================================================================= */
const GUANTES = [

  /* ========================= TELA / SEMI ========================= */
  { id: "fox-naranja",    nombre: "FOX Dirtpaw", version: "Naranja / Negro", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8296.webp", destacado: true },
  { id: "fox-naranja2",   nombre: "FOX Dirtpaw", version: "Naranja", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8297.webp" },
  { id: "fox-amarillo",   nombre: "FOX Dirtpaw", version: "Amarillo", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8298.webp" },
  { id: "fox-azul",       nombre: "FOX Dirtpaw", version: "Azul", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8299.webp" },
  { id: "fox-rojoazul",   nombre: "FOX Dirtpaw", version: "Rojo / Azul", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8300.webp" },
  { id: "fox-neon",       nombre: "FOX Dirtpaw", version: "Verde Neón / Gris", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8301.webp" },
  { id: "fox-rojo",       nombre: "FOX Dirtpaw", version: "Rojo / Negro", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8302.webp" },
  { id: "fox-rojo2",      nombre: "FOX Dirtpaw", version: "Rojo", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8303.webp" },
  { id: "fox-multi",      nombre: "FOX Dirtpaw", version: "Multicolor", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8306.webp" },
  { id: "fox-blanco",     nombre: "FOX Dirtpaw", version: "Blanco / Gris", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8307.webp" },
  { id: "fox-turquesa",   nombre: "FOX Dirtpaw", version: "Turquesa", precio: 45000, categoria: "tela", marca: "FOX", img: "IMG_8308.webp" },

  { id: "fox-prot-gris",  nombre: "FOX Protección", version: "Gris / Negro", precio: 35000, categoria: "tela", marca: "FOX", img: "IMG_8304.webp" },
  { id: "fox-prot-rosa",  nombre: "FOX Protección", version: "Rosa / Negro", precio: 35000, categoria: "tela", marca: "FOX", img: "IMG_8305.webp" },

  { id: "city-neon",      nombre: "City (semi impermeable)", version: "Verde Neón", precio: 45000, categoria: "tela", marca: "CITY", img: "IMG_8548.webp", destacado: true },
  { id: "city-colores",   nombre: "City (semi impermeable)", version: "Surtido de colores", precio: 45000, categoria: "tela", marca: "CITY", img: "IMG_8551.webp" },
  { id: "city-gris",      nombre: "City (semi impermeable)", version: "Gris / Morado / Rosa", precio: 45000, categoria: "tela", marca: "CITY", img: "IMG_8552.webp" },

  { id: "suomy11-rosa",   nombre: "SUOMY / AXE", version: "Rosa / Negro", precio: 43000, categoria: "tela", marca: "SUOMY", img: "IMG_8553.webp" },
  { id: "suomy11-color",  nombre: "SUOMY / AXE", version: "Surtido de colores", precio: 43000, categoria: "tela", marca: "SUOMY", img: "IMG_8554.webp" },
  { id: "suomy19",        nombre: "SUOMY 19", version: "Negro Racing", precio: 60000, categoria: "tela", marca: "SUOMY", img: "IMG_8587.webp" },

  { id: "motowolf-negro", nombre: "MOTOWOLF", version: "Negro", precio: 55000, categoria: "tela", marca: "MOTOWOLF", img: "IMG_8556.webp" },
  { id: "motowolf-rosa",  nombre: "MOTOWOLF", version: "Negro / Rosa", precio: 55000, categoria: "tela", marca: "MOTOWOLF", img: "IMG_8557.webp" },

  { id: "rsspurtt",       nombre: "RSSPURTT", version: "Verde Neón / Rosa", precio: 55000, categoria: "tela", marca: "RSSPURTT", img: "IMG_8567.webp" },

  { id: "alpine-basico",  nombre: "ALPINESTAR", version: "Negro / Rojo", precio: 50000, categoria: "tela", marca: "ALPINESTAR", img: "IMG_8558.webp" },
  { id: "alpine-3col",    nombre: "ALPINESTAR", version: "Rojo / Negro / Azul", precio: 50000, categoria: "tela", marca: "ALPINESTAR", img: "IMG_8589.webp" },

  { id: "probiker-rosa",  nombre: "PRO BIKER", version: "Rosa / Negro", precio: 35000, categoria: "tela", marca: "PRO BIKER", img: "IMG_8590.webp" },
  { id: "probiker-rojo",  nombre: "PRO BIKER", version: "Rojo / Negro", precio: 35000, categoria: "tela", marca: "PRO BIKER", img: "IMG_8597.webp" },

  { id: "moster",         nombre: "MOSTER", version: "Verde / Negro", precio: 30000, categoria: "tela", marca: "MOSTER", img: "IMG_8595.webp" },
  { id: "prius-gtp05",    nombre: "PRIUS GTP05", version: "Negro", precio: 30000, categoria: "tela", marca: "PRIUS", img: "IMG_8592.webp" },
  { id: "prius-sc06",     nombre: "PRIUS SC06", version: "Rojo / Negro", precio: 45000, categoria: "tela", marca: "PRIUS", img: "IMG_8594.webp" },
  { id: "madbike",        nombre: "MADBIKE", version: "Negro", precio: 60000, categoria: "tela", marca: "MADBIKE", img: "IMG_8566.webp" },
  { id: "cremallera",     nombre: "Cremallera Semi", version: "Negro / Rosa", precio: 25000, categoria: "tela", marca: "GENÉRICO", img: "IMG_8565.webp" },
  { id: "traslucido",     nombre: "TRASLÚCIDO", version: "Holográfico", precio: 65000, categoria: "tela", marca: "VEMAR", img: "IMG_8564.webp" },
  { id: "peluche",        nombre: "Cuerina Peluche", version: "Negro", precio: 30000, categoria: "tela", marca: "GENÉRICO", img: "IMG_8547.webp" },

  /* ============================ MEDIO DEDO ======================= */
  { id: "medio-racing",   nombre: "Medio Dedo Racing", version: "Rojo / Azul", precio: 25000, categoria: "medio", marca: "M-RACE", img: "IMG_8599.webp" },
  { id: "medio-ocle",     nombre: "Medio Dedo OCLE", version: "Verde Militar / Negro", precio: 35000, categoria: "medio", marca: "OCLE", img: "IMG_8600.webp" },

  /* =============================== CUERO ========================= */
  { id: "alpine-gppro",   nombre: "ALPINESTAR GP PRO", version: "Cuero Negro Caña Larga", precio: 200000, categoria: "cuero", marca: "ALPINESTAR", img: "IMG_8560.webp", destacado: true },
  { id: "alpine-gppro2",  nombre: "ALPINESTAR GP PRO", version: "Cuero Negro (detalle)", precio: 200000, categoria: "cuero", marca: "ALPINESTAR", img: "IMG_8561.webp" },
  { id: "alpine-sp8",     nombre: "ALPINESTAR SP8", version: "Negro / Blanco / Rojo", precio: 210000, categoria: "cuero", marca: "ALPINESTAR", img: "IMG_8563.webp" },
  { id: "alpine-media",   nombre: "ALPINESTAR Caña Media", version: "Cuero Negro", precio: 130000, categoria: "cuero", marca: "ALPINESTAR", img: "IMG_8562.webp" },

  { id: "dfr-cuero",      nombre: "DFR Cuero", version: "Negro / Azul", precio: 90000, categoria: "cuero", marca: "DFR", img: "IMG_8576.webp" },

  { id: "maranata-cuero", nombre: "MARANATA Cuero", version: "Surtido de colores", precio: 85000, categoria: "cuero", marca: "MARANATA", img: "IMG_8583.webp" },
  { id: "maranata-larga", nombre: "MARANATA Caña Larga", version: "Rosa / Negro / Gris", precio: 110000, categoria: "cuero", marca: "MARANATA", img: "IMG_8585.webp", destacado: true },
  { id: "maranata-rosa",  nombre: "MARANATA Cuero", version: "Rosa / Negro", precio: 85000, categoria: "cuero", marca: "MARANATA", img: "IMG_8573.webp" },
  { id: "maranata-amar",  nombre: "MARANATA Cuero", version: "Amarillo / Morado", precio: 85000, categoria: "cuero", marca: "MARANATA", img: "IMG_8574.webp" },
  { id: "maranata-3col",  nombre: "MARANATA Cuero", version: "Rosa / Negro / Morado", precio: 85000, categoria: "cuero", marca: "MARANATA", img: "IMG_8577.webp" },

  { id: "fox-cuero1",     nombre: "FOX Cuero Caña Larga", version: "Negro / Rosa", precio: 85000, categoria: "cuero", marca: "FOX", img: "IMG_8578.webp" },
  { id: "fox-cuero2",     nombre: "FOX Cuero Caña Larga", version: "Negro / Morado", precio: 85000, categoria: "cuero", marca: "FOX", img: "IMG_8579.webp" },
  { id: "fox-cuero3",     nombre: "FOX Cuero Caña Larga", version: "Surtido", precio: 85000, categoria: "cuero", marca: "FOX", img: "IMG_8580.webp" },
  { id: "fox-bomper1",    nombre: "FOX Bomper", version: "Naranja / Verde", precio: 80000, categoria: "cuero", marca: "FOX", img: "IMG_8581.webp" },
  { id: "fox-bomper2",    nombre: "FOX Bomper", version: "Morado / Blanco / Rosa", precio: 80000, categoria: "cuero", marca: "FOX", img: "IMG_8596.webp" },

  { id: "cuero-tex",      nombre: "Cuero Tex Económico", version: "Negro / Rosa", precio: 35000, categoria: "cuero", marca: "GENÉRICO", img: "IMG_8559.webp" },

  /* ========================== IMPERMEABLES ======================= */
  { id: "imp-traslucido", nombre: "TRASLÚCIDO Impermeable", version: "Negro Touch", precio: 90000, categoria: "impermeable", marca: "GENÉRICO", img: "IMG_8598.webp" },
  { id: "over-st11",      nombre: "OVER ST11", version: "Negro", precio: 90000, categoria: "impermeable", marca: "OVER", img: "IMG_8607.webp" },
  { id: "over-holo",      nombre: "OVER Holográfico", version: "Reflectivo", precio: 90000, categoria: "impermeable", marca: "OVER", img: "IMG_8608.webp", destacado: true },
  { id: "mrace-gm001",    nombre: "MRACE GM001", version: "Rojo / Morado / Verde", precio: 90000, categoria: "impermeable", marca: "M-RACE", img: "IMG_8602.webp" },
  { id: "mrace-010",      nombre: "MRACE 010", version: "Negro / Verde / Rosa", precio: 130000, categoria: "impermeable", marca: "M-RACE", img: "IMG_8603.webp" },
  { id: "imp-750",        nombre: "Impermeable 750", version: "Rojo / Azul", precio: 90000, categoria: "impermeable", marca: "M-RACE", img: "IMG_8604.webp" },
  { id: "mrace-gm22",     nombre: "MRACE Traslúcido GM22", version: "Holográfico", precio: 30000, categoria: "impermeable", marca: "M-RACE", img: "IMG_8605.webp" },
  { id: "mrace-gm22b",    nombre: "MRACE Traslúcido GM22", version: "Holográfico (par)", precio: 30000, categoria: "impermeable", marca: "M-RACE", img: "IMG_8606.webp" },
  { id: "puizzance-14",   nombre: "PUIZZANCE WPZ14", version: "Negro", precio: 90000, categoria: "impermeable", marca: "PUIZZANCE", img: "IMG_8568.webp" },
  { id: "puizzance-12",   nombre: "PUIZZANCE WPZ12", version: "Negro / Gris", precio: 90000, categoria: "impermeable", marca: "PUIZZANCE", img: "IMG_8588.webp" },
];
