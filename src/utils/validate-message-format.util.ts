import * as Joi from 'joi';

export type MessageFormat = {
  operation: string;
  operationType: string;
  quantity: string;
  paymentOption: string;
  price: string;
  location: string;
  notes: string;
};

export type MessageFormatInput = {
  [key: string]: string | undefined;
};

const schema = Joi.object({
  operacion: Joi.string().min(3).max(50).required(),
  cantidad: Joi.string().min(2).max(50).optional(),
  precio: Joi.string().min(1).max(50).required(),
  formadepago: Joi.string().max(50).optional(),
  zona: Joi.string().max(50).optional(),
  observacion: Joi.string().max(200).optional(),
});

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
  const mappedItems: MessageFormatInput = {
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

  if (typeof mappedItems['pago'] !== 'undefined') {
    mappedItems['formadepago'] = mappedItems['pago'];
    delete mappedItems['pago'];
  }

  // Validates against format
  const { error } = schema.validate(mappedItems);
  if (error) {
    throw error.message;
  }

  const operation = mappedItems?.operacion ?? '';
  let operationType = operation.indexOf('venta') >= 0 ? 'venta' : operation.indexOf('compra') >= 0 ? 'compra' : null;
  if (!operationType) {
    operationType = operation.indexOf('vendo') >= 0 ? 'venta' : operation.indexOf('compro') >= 0 ? 'compra' : null;
  }

  if (!operationType || operationType.length === 0) {
    throw 'Solo compra y venta son validas';
  }

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
};
