import { LineaTicket, TicketFinal, } from './model';
import { obtenerResultadoLineaTicket, obtenerResultadoTotalTicket, obtenerTotalPorTipoDeIva } from './calcula-ticket.helpers';

export const calculaTicket = (lineasTicket: LineaTicket[]) : TicketFinal => {

  if(!lineasTicket) {
    throw new Error('Los parámetros introducidos son incorrectos')
  }

  const resultadoLineaTicket = obtenerResultadoLineaTicket(lineasTicket);
  const resultadoTotalLineaTicket = obtenerResultadoTotalTicket(resultadoLineaTicket)
  const totalPorTipoIva = obtenerTotalPorTipoDeIva(resultadoLineaTicket);

  return {
    lineas: resultadoLineaTicket,
    total: resultadoTotalLineaTicket,
    desgloseIva: totalPorTipoIva
  }
};
