# Módulo 9 - Laboratorio 9.1 Ticket de Compra

En este laboratorio vamos a hacer un programa que nos calcule el precio de un ticket de compra.

El ticket de compra tendrá una serie de líneas de ticket, cada una de ellas con un producto y una cantidad.

Cada producto tendrá un nombre, un precio y un tipo de IVA.

Cada producto va a tener esta interfaz:

```typescript
type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}
```

Además, cada línea del ticket estará compuesta por un producto y una cantidad, y se define mediante la siguiente interfaz:

```typescript
interface LineaTicket {
producto: Producto;
cantidad: number;
}
```
A continuación, se muestra un ejemplo de productos de entrada:

```typescript

const productos: LineaTicket[] = [
{
producto: {
nombre: "Legumbres",
precio: 2,
tipoIva: "general",
},
cantidad: 2,
},
{
producto: {
nombre: "Perfume",
precio: 20,
tipoIva: "general",
},
cantidad: 3,
},
{
producto: {
nombre: "Leche",
precio: 1,
tipoIva: "superreducidoC",
},
cantidad: 6,
},
{
producto: {
nombre: "Lasaña",
precio: 5,
tipoIva: "superreducidoA",
},
cantidad: 1,
},
];
```

Nota: El precio de los productos es el precio unitario, es decir, el precio de una unidad del producto.

Puedes añadir más productos si lo deseas.

La estructura inicial de la función para calcular el ticket sería la siguiente:

```typescript

const calculaTicket = (lineasTicket: LineaTicket[]) => {
for (let i = 0; i < lineasTicket.length; i++) {
// ...
}
};
```

También se podría utilizar el método reduce de JavaScript de la siguiente manera:

```typescript

const calculaTicket = (lineasTicket: LineaTicket[]) => {
lineasTicket
.reduce
// ...
();
};
```

La función calculaTicket devolverá un ticket que contendrá la siguiente información:

Por cada producto queremos el nombre, la cantidad, el precio sin IVA, el tipo de IVA y el precio con IVA.
Tendremos la siguiente interfaz:

```typescript

interface ResultadoLineaTicket {
nombre: string;
cantidad: number;
precionSinIva: number;
tipoIva: TipoIva;
precioConIva: number;
}
```

En cuanto a los totales:
El total sin IVA.
El IVA.
Un desglose del total por tipo de IVA, es decir, la suma de los importes correspondientes a cada tipo de IVA.
El total del ticket, incluyendo el IVA.
Para esto tendremos las siguientes interfaces:

```typescript

interface ResultadoTotalTicket {
totalSinIva: number;
totalConIva: number;
totalIva: number;
}

interface TotalPorTipoIva {
tipoIva: TipoIVA;
cuantia : number;
}

interface TicketFinal {
lineas: ResultadoLineaTicket[];
total: ResultadoTotalTicket;
desgloseIva: TotalPorTipoIva[];
}
```

Pistas:

Para calcular el IVA de un producto, se multiplica el precio del producto por el porcentaje de IVA y se divide entre 100.

Por ejemplo, si el precio del producto es 10 y el IVA es el 21%, el IVA será 2,1.

Para redondear un número a dos decimales, se puede utilizar el método toFixed de JavaScript.

Si necesitas crear funciones auxiliares, se recomienda crearlas. Así, la función principal será más sencilla de leer.
