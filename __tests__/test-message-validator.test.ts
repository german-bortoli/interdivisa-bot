import { getMessageFormatFromText } from '../src/utils';

it('Venta: Validate proper format', () => {
  const text = `
    Operación : venta USD cara grande
    Cantidad: 11.600
    Precio: $163
    Forma de pago: efectivo billetes grandes
    Zona: microcentro: Santa Fe
    Observación: Billetes rotos`;

  const result = getMessageFormatFromText(text);

  const expected = {
    operation: 'venta usd cara grande',
    operationType: 'venta',
    quantity: '11.600',
    paymentOption: 'efectivo billetes grandes',
    price: '$163',
    location: 'microcentro: santa fe',
    notes: 'billetes rotos',
  };

  expect.assertions(1);
  expect(result).toEqual(expected);
});



it('Compra: Typo en operacion', () => {
  const text = `
    Operación : Conpra USD cara grande
    Cantidad: 11.600
    Precio: $163
    Forma de pago: efectivo billetes grandes
    Zona: microcentro: Santa Fe
    Observación: Billetes rotos`;

  try {
    getMessageFormatFromText(text);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e) {
    expect(e.length).not.toEqual(0);
  }
});

it('Compra: Validate proper format', () => {
  const text = `
    Operación : Compro USD cara chica
    Cantidad : 500
    Precio:a convenir
    Zona : Santa Fe, centro`;

  const result = getMessageFormatFromText(text);

  const expected = {
    operation: 'compro usd cara chica',
    operationType: 'compra',
    quantity: '500',
    paymentOption: '',
    price: 'a convenir',
    location: 'santa fe, centro',
    notes: '',
  };

  expect.assertions(1);
  expect(result).toEqual(expected);
});

it('Validate wrong format', () => {
  const text = `
    Cantidad: 11.600
    zaraza: algo loco
    Precio: $163
    Forma de pago: efectivo billetes grandes
    Zona: microcentro: Santa Fe
    Observación: Billetes rotos`;

  expect.assertions(1);

  try {
    getMessageFormatFromText(text);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e) {
    expect(e).toBe('"operacion" is required');
  }
});

it('Validate wrong format with extra unwanted texts', () => {
  const text = `
    Operacion: 123
    Cantidad: 11.600
    zaraza: algo loco
    Precio: $163
    Forma de pago: efectivo billetes grandes
    Zona: microcentro: Santa Fe
    Observación: Billetes rotos`;

  expect.assertions(1);

  try {
    const result = getMessageFormatFromText(text);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e) {
    expect(e).toBe('"zaraza" is not allowed');
  }
});

it('Validate wrong format with empty values', () => {
  const text = `
    OperacíoN : 123
    Cantidad: 11.600
    zaraza: algo loco
    Precio: $163
    Fórmá de pago:`;

  expect.assertions(1);

  try {
    const result = getMessageFormatFromText(text);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e) {
    expect(e).toBe('"formadepago" is not allowed to be empty');
  }
});

it('Check empty string', () => {
  const text = ``;

  expect.assertions(1);

  try {
    const result = getMessageFormatFromText(text);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e) {
    expect(e).toBe('Text is empty');
  }
});
