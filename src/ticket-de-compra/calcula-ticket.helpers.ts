import {
  TipoIva,
  LineaTicket,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
} from "./model";

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

  const ivaPorcentaje = obtenerPorcetajeDeIva(tipoDeIva);
  const iva = (precio * ivaPorcentaje) / 100;
  const precioSinIva = precio - iva;
  const precioSinIvaRedondeado = redondearNumero(precioSinIva);

  return precioSinIvaRedondeado;
};

export const obtenerResultadoLineaTicket = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  let resultadoLineasTicket: ResultadoLineaTicket[] = [];

  if (!lineasTicket) {
    throw new Error("Los parámetros ingresados no son correctos");
  }

  for (let i = 0; i < lineasTicket.length; i++) {
    const { producto, cantidad } = lineasTicket[i];

    const precioSinIva = redondearNumero(
      obtenerPrecioSinIva(producto.precio, producto.tipoIva) * cantidad
    );
    const precioConIva = redondearNumero(producto.precio * cantidad);

    resultadoLineasTicket = [
      ...resultadoLineasTicket,
      {
        nombre: producto.nombre,
        cantidad: cantidad,
        precioSinIva,
        tipoIva: producto.tipoIva,
        precioConIva,
      },
    ];
  }

  return resultadoLineasTicket;
};

export const obtenerResultadoTotalTicket = (
  lineasTicket: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  if (!lineasTicket) {
    throw new Error("Los parámetros introducidos no son correctos");
  }

  const totalSinIva = lineasTicket.reduce((acc, producto) => {
    acc = acc + producto.precioSinIva;
    return acc;
  }, 0);

  const totalConIva = lineasTicket.reduce((acc, producto) => {
    acc = acc + producto.precioConIva;
    return acc;
  }, 0);

  const totalIva = lineasTicket.reduce((acc, producto) => {
    const iva = producto.precioConIva - producto.precioSinIva;
    acc = acc + iva;
    return acc
  }, 0)

  return {
    totalSinIva: redondearNumero(totalSinIva),
    totalConIva: redondearNumero(totalConIva),
    totalIva : redondearNumero(totalIva),
  };
};

export const obtenerTotalPorTipoDeIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  if (!resultadoLineaTicket) {
    throw new Error("Los parámetros ingresados son incorrectos");
  }

  let totalPorTipoIva: TotalPorTipoIva[] = [];

  resultadoLineaTicket.forEach((lineaTicket) => {
    const index = totalPorTipoIva.findIndex(
      (porTipoIva) => porTipoIva.tipoIva === lineaTicket.tipoIva
    );

    if (index !== -1) {
      totalPorTipoIva[index].cuantia = redondearNumero(
        totalPorTipoIva[index].cuantia +
          lineaTicket.precioConIva -
          lineaTicket.precioSinIva
      );
    } else {
      totalPorTipoIva = [
        ...totalPorTipoIva,
        {
          tipoIva: lineaTicket.tipoIva,
          cuantia: redondearNumero(
            lineaTicket.precioConIva - lineaTicket.precioSinIva
          ),
        },
      ];
    }
  });

  return totalPorTipoIva;
};
