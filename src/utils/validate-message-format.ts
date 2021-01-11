type MessageFormat = {
  operation: string; // operacion req
  operationType: string; // auto generado, venta o compra req
  quantity: string; // cantidad req
  paymentOption: string; // forma de pago
  price: string; // precio req
  location: string; // zona
  notes: string; // observacion
};

/**
 * Validates and retrieves a message format from a text
 * @param text
 */
export const getMessageFormatFromText = (text: string): MessageFormat | never => {
  if (text.length === 0) {
    throw 'Text is empty';
  }

  const tmpText: string[] = text.toLowerCase().split('\n');
  const preText = tmpText.map((line) => line.split(':'));
  const mappedItems = {
    operacion: undefined,
    cantidad: undefined,
    precio: undefined,
    formadepago: undefined,
    zona: undefined,
    observacion: undefined,
  };

  preText.forEach((line, index) => {
    if (line.length <= 1) {
      delete preText[index];
      return;
    }

    const textKey = line[0]
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    mappedItems[textKey] = line.slice(1).join(':').trim();
  });

  const operation = mappedItems?.operacion ?? '';
  const operationType = operation.indexOf('venta') >= 0 ? 'venta' : operation.indexOf('compra') >= 0 ? 'compra' : null;

  const toReturn = {
    operation,
    operationType,
    quantity: mappedItems?.cantidad ?? '',
    paymentOption: mappedItems?.formadepago ?? '',
    price: mappedItems?.precio ?? '',
    location: mappedItems?.zona ?? '',
    notes: mappedItems?.observacion ?? '',
  };

  return toReturn;

  // throw 'Error while validating';
};
