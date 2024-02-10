import { TipoIva, LineaTicket, ResultadoLineaTicket } from "./model";

const redondearNumero = (numero: number) => Number(numero.toFixed(2));

export const obtenerPorcetajeDeIva = (tipoDeIva: TipoIva): number => {
  if (!tipoDeIva) {
    throw new Error("Los parámetros ingresados no son correctos");
  }

  let iva: number = 0;

  switch (tipoDeIva) {
    case "general":
      iva = 21;
      break;
    case "reducido":
      iva = 10;
      break;
    case "superreducidoA":
      iva = 5;
      break;
    case "superreducidoB":
      iva = 4;
      break;
    case "superreducidoC":
      iva = 0;
      break;
    case "sinIva":
      iva = 0;
      break;
  }

  return iva;
};

export const obtenerPrecioSinIva = (
  precio: number,
  tipoDeIva: TipoIva
): number => {
  if (precio === undefined || precio == null || !tipoDeIva) {
    throw new Error("Los parámetros ingresados no son correctos");
  }

  const iva = obtenerPorcetajeDeIva(tipoDeIva);
  const precioSinIva = precio - (precio * iva) / 100;
  const precioSinIvaRedondeado = redondearNumero(precioSinIva);
  return precioSinIvaRedondeado;
};

export const resultadoLineaTicket = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  let resultadoLineasTicket: ResultadoLineaTicket[] = [];

  if (!lineasTicket) {
    throw new Error("Los parámetros ingresados no son correctos");
  }

  for (let i = 0; i < lineasTicket.length; i++) {
    const { producto, cantidad } = lineasTicket[i];

    resultadoLineasTicket = [
      ...resultadoLineasTicket,
      {
        nombre: producto.nombre,
        cantidad: cantidad,
        precionSinIva: obtenerPrecioSinIva(producto.precio, producto.tipoIva),
        tipoIva: producto.tipoIva,
        precioConIva: producto.precio,
      },
    ];
  }

  return resultadoLineasTicket;

  //TODO: Implementar Tests para la funcion
};
