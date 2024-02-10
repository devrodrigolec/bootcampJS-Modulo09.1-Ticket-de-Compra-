

/* 
Tipo de IVA |	Porcentaje	|Bienes y servicios que graba
General      |	21% |	Más común y afecta a la mayoría de productos y servicios: electrónica, ropa, automóviles, mobiliario, etc.
Reducido	10%	Cultura, alimentación y transporte.
Superreducido A	5%	Nuevo tipo de IVA desde el 01/01/2023 aplicable a: aceites de oliva y de semillas y pastas alimenticias.
Superreducido B	4%	Alimentación esencial, libros o medicamentos.
Superreducido C	0%	Nuevo tipo de IVA desde el 01/01/2023 aplicable a: pan común, harina panificables, leches, quesos, huevos, frutas, verduras, hortalizas, legumbres, tubérculos y cereales.
Sin IVA	0%	Servicios de asistencia sanitaria o educación. */

export type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

export interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

export interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precionSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
}

export interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

export interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia : number;
}

export interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}
