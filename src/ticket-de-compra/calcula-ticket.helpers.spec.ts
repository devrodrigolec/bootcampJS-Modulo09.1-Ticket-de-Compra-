
import {
  obtenerPorcetajeDeIva,
  obtenerPrecioSinIva,
  resultadoLineaTicket,
} from "./calcula-ticket.helpers";

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
  it('si recibe undefined como parametro, debe retornar throw Error', () => {
    //Arrange
    const lineaTicket : any = undefined;
    //Act
    const resultado = () => resultadoLineaTicket(lineaTicket);
       //Assert
      expect(resultado).toThrowError('Los parámetros ingresados no son correctos')
  })
  it('si recibe null como parametro, debe retornar throw Error', () => {
    //Arrange
    const lineaTicket : any = null;
    //Act
    const resultado = () => resultadoLineaTicket(lineaTicket);
       //Assert
      expect(resultado).toThrowError('Los parámetros ingresados no son correctos')
  })

  
});
