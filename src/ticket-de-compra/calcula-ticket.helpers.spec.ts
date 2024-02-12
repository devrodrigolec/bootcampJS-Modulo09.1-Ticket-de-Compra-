import {
  obtenerPorcetajeDeIva,
  obtenerPrecioSinIva,
  obtenerResultadoTotalTicket,
  obtenerResultadoLineaTicket,
  obtenerTotalPorTipoDeIva,
} from "./calcula-ticket.helpers";
import {
  LineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
  arrayTipoIva,
} from "./model";

describe("obtenerPorcentajeDeIva", () => {
  it("Si tipoDeIVa es undefined, debe retornar throw Error", () => {
    //Arrange
    const tipoDeIva: any = undefined;
    //Act
    const resultado = () => obtenerPorcetajeDeIva(tipoDeIva);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros ingresados no son correctos"
    );
  });
  it("Si tipoDeIVa es null, debe retornar throw Error", () => {
    //Arrange
    const tipoDeIva: any = null;
    //Act
    const resultado = () => obtenerPorcetajeDeIva(tipoDeIva);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros ingresados no son correctos"
    );
  });

  it.each([
    ["general", 21],
    ["reducido", 10],
    ["superreducidoA", 5],
    ["superreducidoB", 4],
    ["superreducidoC", 0],
    ["sinIva", 0],
  ])(
    "Si tipo de IVA es %s, debe retornar %s",
    (tipoDeIVa, resultadoEsperado) => {
      //Act
      const resultado = obtenerPorcetajeDeIva(tipoDeIVa);
      //Assert
      expect(resultado).toBe(resultadoEsperado);
    }
  );
});

describe("obtenerPrecioSinIva", () => {
  it("Si tipoDeIva o precio son undefined, debe retornar throw Error", () => {
    //Arrange
    const TipoIva: any = undefined;
    const precio: any = undefined;
    //Act
    const resultado = () => obtenerPrecioSinIva(precio, TipoIva);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros ingresados no son correctos"
    );
  });

  it.each([
    [20, "general", 15.8],
    [10, "reducido", 9],
    [15, "superreducidoA", 14.25],
    [5, "superreducidoB", 4.8],
    [2, "superreducidoC", 2],
    [3, "sinIva", 3],
  ])(
    "Si el precio es %s, el tipo de Iva es %s, el precio sin iva debe ser %s",
    (precio, tipoDeIva, resultadoEsperado) => {
      //ACt
      const resultado = obtenerPrecioSinIva(precio, tipoDeIva);
      //Assert
      expect(resultado).toBe(resultadoEsperado);
    }
  );
});

describe("resultadosLineasTicket", () => {
  it("si recibe undefined como parmetro, debe retornar throw Error", () => {
    //Arrange
    const lineaTicket: any = undefined;
    //Act
    const resultado = () => obtenerResultadoLineaTicket(lineaTicket);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros ingresados no son correctos"
    );
  });
  it("si recibe null como parámetro, debe retornar throw Error", () => {
    //Arrange
    const lineaTicket: any = null;
    //Act
    const resultado = () => obtenerResultadoLineaTicket(lineaTicket);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros ingresados no son correctos"
    );
  });

  it('Si recibe [{producto:{ nombre: "Legumbres",precio: 2,tipoIva: "general"},  cantidad: 2 }] debe retornar [{nombre: "Legumbres, cantidad: 2, precioSinIva: 1.58, tipoIva: "general", precioConIva: 2}]', () => {
    //Arrange
    const lineaTicket = [
      {
        producto: { nombre: "Legumbres", precio: 2, tipoIva: "general" },
        cantidad: 2,
      },
    ];
    //Act
    const resultado = obtenerResultadoLineaTicket(lineaTicket);
    //Assert
    const resultadoEsperado = [
      {
        nombre: "Legumbres",
        cantidad: 2,
        precioSinIva: 3.16,
        tipoIva: "general",
        precioConIva: 4,
      },
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('Si recibe [{producto:{ nombre: "Perfume",precio: 20,tipoIva: "general"},  cantidad: 3 },{producto:{ nombre: "Leche",precio: 1,tipoIva: "superreducidoC"},  cantidad: 6 }] debe retornar [{nombre: "Perfume", cantidad: 3, precioSinIva: 47.62, tipoIva: "general", precioConIva: 57},{nombre: "Leche", cantidad: 6, precioSinIva: 6, tipoIva: "superreducidoC", precioConIva: 6}]', () => {
    //Arrange
    const lineaTicket = [
      {
        producto: { nombre: "Perfume", precio: 20, tipoIva: "general" },
        cantidad: 3,
      },
      {
        producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" },
        cantidad: 6,
      },
    ];
    //Act
    const resultado = obtenerResultadoLineaTicket(lineaTicket);
    //Assert
    const resultadoEsperado = [
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
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });

  it('Si recibe [{producto:{ nombre: "Lasaña",precio: 5,tipoIva: "superreducidoA"},  cantidad: 1 }] debe retornar [{nombre: "Lasaña", cantidad: 1, precioSinIva: 4.76, tipoIva: "superreducidoA", precioConIva: 5}]', () => {
    //Arrange
    const lineaTicket = [
      {
        producto: { nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" },
        cantidad: 1,
      },
    ];
    //Act
    const resultado = obtenerResultadoLineaTicket(lineaTicket);
    //Assert
    const resultadoEsperado = [
      {
        nombre: "Lasaña",
        cantidad: 1,
        precioSinIva: 4.75,
        tipoIva: "superreducidoA",
        precioConIva: 5,
      },
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });

  // Caso de prueba 4: Una línea de ticket con productos de diferentes tipos de IVA
  it('Si recibe [{producto:{ nombre: "Legumbres",precio: 2,tipoIva: "general"},  cantidad: 2 },{producto:{ nombre: "Perfume",precio: 20,tipoIva: "general"},  cantidad: 3 },{producto:{ nombre: "Leche",precio: 1,tipoIva: "superreducidoC"},  cantidad: 6 },{producto:{ nombre: "Lasaña",precio: 5,tipoIva: "superreducidoA"},  cantidad: 1 }] debe retornar [{nombre: "Legumbres", cantidad: 2, precioSinIva: 1.580, tipoIva: "general", precioConIva: 2},{nombre: "Perfume", cantidad: 3, precioSinIva: 47.4, tipoIva: "general", precioConIva: 57},{nombre: "Leche", cantidad: 6, precioSinIva: 6, tipoIva: "superreducidoC", precioConIva: 6},{nombre: "Lasaña", cantidad: 1, precioSinIva: 4.76, tipoIva: "superreducidoA", precioConIva: 5}]', () => {
    //Arrange
    const lineaTicket = [
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
    const resultado = obtenerResultadoLineaTicket(lineaTicket);
    //Assert
    const resultadoEsperado = [
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
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });

  it("Si recibe [] debe retornar []", () => {
    //Arrange
    const lineaTicket: LineaTicket[] = [];
    //Act
    const resultado = obtenerResultadoLineaTicket(lineaTicket);
    //Assert
    const resultadoEsperado: LineaTicket[] = [];
    expect(resultado).toEqual(resultadoEsperado);
  });
});

describe("obtenerResultadoTotalTicket", () => {
  it("Si recibe undefined, debe retornar throw Error", () => {
    //Arrange
    const parámetro: any = undefined;
    //Act
    const resultado = () => obtenerResultadoTotalTicket(parámetro);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros introducidos no son correctos"
    );
  });
  it("Si recibe undefined, debe retornar throw Error", () => {
    //Arrange
    const parámetro: any = null;
    //Act
    const resultado = () => obtenerResultadoTotalTicket(parámetro);
    //Assert
    expect(resultado).toThrowError(
      "Los parámetros introducidos no son correctos"
    );
  });

  it("Si recibe un ticket, debe devolver los totales de con IVA, sin IVA y el total del IVA", () => {
    //Arrange
    const resultadoLineaTicket = [
      {
        nombre: "Legumbres",
        cantidad: 2,
        precioSinIva: 3.16,
        tipoIva: "general",
        precioConIva: 4,
      },
    ];
    //Act
    const resultado = obtenerResultadoTotalTicket(resultadoLineaTicket);
    //Assert
    const resultadoEsperado: ResultadoTotalTicket = {
      totalConIva: 4,
      totalSinIva: 3.16,
      totalIva: 0.84,
    };
    expect(resultado).toEqual(resultadoEsperado);
  });
  it("Si recibe un ticket, debe devolver los totales de con IVA, sin IVA y el total del IVA", () => {
    //Arrange
    const resultadoLineaTicket = [
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
    ];
    //Act
    const resultado = obtenerResultadoTotalTicket(resultadoLineaTicket);
    //Assert
    const resultadoEsperado: ResultadoTotalTicket = {
      totalConIva: 66,
      totalSinIva: 53.4,
      totalIva: 12.6,
    };
    expect(resultado).toEqual(resultadoEsperado);
  });
  it("Si recibe un ticket, debe devolver los totales de con IVA, sin IVA y el total del IVA", () => {
    //Arrange
    const resultadoLineaTicket = [
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
    ];
    //Act
    const resultado = obtenerResultadoTotalTicket(resultadoLineaTicket);
    //Assert
    const resultadoEsperado: ResultadoTotalTicket = {
      totalConIva: 75,
      totalSinIva: 61.31,
      totalIva: 13.69,
    };
    expect(resultado).toEqual(resultadoEsperado);
  });

  it("Si recibe [] debe retornar todo con valores de 0", () => {
    //Arrange
    const parámetro: any = [];
    //Act
    const resultado = obtenerResultadoTotalTicket(parámetro);
    //Assert
    const resultadoEsperado: ResultadoTotalTicket = {
      totalConIva: 0,
      totalIva: 0,
      totalSinIva: 0,
    };
    expect(resultado).toEqual(resultadoEsperado);
  });
});

describe("totalPorTipoDeIva", () => {
  it("Si recibe undefined debe retornar throw new Error", () => {
    //Arrange
    const resultadoLineaTicket: any = undefined;
    const arrayTipoIva: any = undefined;
    //Act
    const resultado = () =>
      obtenerTotalPorTipoDeIva(resultadoLineaTicket, arrayTipoIva);
    //Assert
    expect(resultado).toThrowError("Los parámetros ingresados son incorrectos");
  });
  it("Si recibe null debe retornar throw new Error", () => {
    //Arrange
    const resultadoLineaTicket: any = null;
    const arrayTipoIva: any = null;
    //Act
    const resultado = () =>
      obtenerTotalPorTipoDeIva(resultadoLineaTicket, arrayTipoIva);
    //Assert
    expect(resultado).toThrowError("Los parámetros ingresados son incorrectos");
  });

  it("si recibe un array, debe retornar un desglose de cada iva con la suma total del mismo", () => {
    //Arrange
    const resultadoLineaTicket = [
      {
        nombre: "Legumbres",
        cantidad: 2,
        precioSinIva: 3.16,
        tipoIva: "general",
        precioConIva: 4,
      },
    ];
    //Act
    const resultado = obtenerTotalPorTipoDeIva(resultadoLineaTicket, arrayTipoIva);
    //Assert
    const resultadoEsperado: TotalPorTipoIva[] = [
      {
        tipoIva: "general",
        cuantia: 0.84,
      },
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });
  it("si recibe un array, debe retornar un desglose de cada iva con la suma total del mismo", () => {
    //Arrange
    const resultadoLineaTicket = [
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
    ];
    //Act
    const resultado = obtenerTotalPorTipoDeIva(resultadoLineaTicket, arrayTipoIva);
    //Assert
    const resultadoEsperado: TotalPorTipoIva[] = [
      {
        tipoIva: "general",
        cuantia: 12.6,
      },
      {
        tipoIva: "superreducidoC",
        cuantia: 0,
      },
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });
  it("si recibe un array, debe retornar un desglose de cada iva con la suma total del mismo", () => {
    //Arrange
    const resultadoLineaTicket = [
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
    ];
    //Act
    const resultado = obtenerTotalPorTipoDeIva(resultadoLineaTicket, arrayTipoIva);
    //Assert
    const resultadoEsperado: TotalPorTipoIva[] = [
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
    ];
    expect(resultado).toEqual(resultadoEsperado);
  });
});
