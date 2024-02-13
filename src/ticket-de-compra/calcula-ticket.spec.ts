import { calculaTicket } from "./calcula-ticket";
import { LineaTicket, TicketFinal } from "./model";

describe("calculaTicket", () => {
  it("debe retornar throw error si el parámetro es undefined", () => {
    //Arrange
    const lineaTicket: any = undefined;
    //Act
    const resultado = () => calculaTicket(lineaTicket);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros introducidos son incorrectos"
    );
  });
  it("debe retornar throw error si el parámetro es null", () => {
    //Arrange
    const lineaTicket: any = null;
    //Act
    const resultado = () => calculaTicket(lineaTicket);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros introducidos son incorrectos"
    );
  });

  it("Debe retornar el ticket total", () => {
    //Arrange
    const lineaTicket: LineaTicket[] = [
      {
        producto: { nombre: "Legumbres", precio: 2, tipoIva: "general" },
        cantidad: 2,
      },
      {
        producto: { nombre: "Perfume", precio: 20, tipoIva: "general" },
        cantidad: 3,
      },
      {
        producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" },
        cantidad: 6,
      },
      {
        producto: { nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" },
        cantidad: 1,
      },
    ];

    //Act
    const resultado: TicketFinal = calculaTicket(lineaTicket);
    //Assert
    const resultadoEsperado: TicketFinal = {
      lineas: [
        {
          nombre: "Legumbres",
          cantidad: 2,
          precioSinIva: 3.16,
          tipoIva: "general",
          precioConIva: 4,
        },
        {
          nombre: "Perfume",
          cantidad: 3,
          precioSinIva: 47.4,
          tipoIva: "general",
          precioConIva: 60,
        },
        {
          nombre: "Leche",
          cantidad: 6,
          precioSinIva: 6,
          tipoIva: "superreducidoC",
          precioConIva: 6,
        },
        {
          nombre: "Lasaña",
          cantidad: 1,
          precioSinIva: 4.75,
          tipoIva: "superreducidoA",
          precioConIva: 5,
        },
      ],
      total: {
        totalSinIva: 61.31,
        totalConIva: 75,
        totalIva: 13.69,
      },

      desgloseIva: [
        {
          tipoIva: "general",
          cuantia: 13.44,
        },
        {
          tipoIva: "superreducidoC",
          cuantia: 0,
        },
        {
          tipoIva: "superreducidoA",
          cuantia: 0.25,
        },
      ],
    };
    expect(resultado).toEqual(resultadoEsperado);
  });
  it("Debe retornar el ticket total", () => {
    //Arrange
    const lineaTicket: LineaTicket[] = [];

    //Act
    const resultado: TicketFinal = calculaTicket(lineaTicket);
    //Assert
    const resultadoEsperado: TicketFinal = {
      lineas: [],
      total: { totalConIva: 0, totalIva: 0, totalSinIva: 0 },
      desgloseIva: [],
    };
    expect(resultado).toEqual(resultadoEsperado);
  });
  it("Debe retornar el ticket total", () => {
    //Arrange
    const lineaTicket: LineaTicket[] = [
      {
        producto: {
          nombre: "Cepillo de dientes",
          precio: 2.5,
          tipoIva: "general",
        },
        cantidad: 5,
      },
      {
        producto: {
          nombre: "Agua mineral",
          precio: 0.8,
          tipoIva: "superreducidoC",
        },
        cantidad: 8,
      },
      {
        producto: {
          nombre: "Pantalones",
          precio: 25,
          tipoIva: "general",
        },
        cantidad: 1,
      },
    ];

    //Act
    const resultado: TicketFinal = calculaTicket(lineaTicket);
    //Assert
    const resultadoEsperado: TicketFinal = {
      lineas: [
        {
          nombre: "Cepillo de dientes",
          precioConIva: 12.5,
          tipoIva: "general",
          cantidad: 5,
          precioSinIva: 9.9,
        },
        {
          nombre: "Agua mineral",
          precioConIva: 6.4,
          tipoIva: "superreducidoC",
          precioSinIva: 6.4,
          cantidad: 8
        },
        {
          nombre: "Pantalones",
          precioConIva: 25,
          precioSinIva: 19.75,
          tipoIva: "general",
          cantidad: 1
        }
      ],
      total: { totalConIva: 43.9, totalIva:7.85  , totalSinIva: 36.05 },
      desgloseIva: [
        {
          tipoIva: 'general',
          cuantia: 7.85
        },
        {
          tipoIva: 'superreducidoC',
          cuantia: 0
        }
      ],
    };
    expect(resultado).toEqual(resultadoEsperado);
  });
});
