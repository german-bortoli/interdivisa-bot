import { getMessageFormatFromText } from '../src/utils';

it('Validate proper format', () => {
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
