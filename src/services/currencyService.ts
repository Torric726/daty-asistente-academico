
// Tasas de cambio aproximadas (última actualización: junio 2023)
// En una aplicación real, estos datos vendrían de una API de conversión de monedas
const exchangeRates = {
  USD: 1,       // Dólar estadounidense (base)
  BOB: 6.91,    // Bolivianos
  PEN: 3.70,    // Soles peruanos
  MXN: 16.73,   // Pesos mexicanos
  COP: 4100,    // Pesos colombianos
  ARS: 840,     // Pesos argentinos
  CLP: 880,     // Pesos chilenos
  EUR: 0.92,    // Euros
};

export type CurrencyCode = keyof typeof exchangeRates;

export const currencies = [
  { code: 'USD', name: 'Dólares estadounidenses', symbol: '$' },
  { code: 'BOB', name: 'Bolivianos', symbol: 'Bs' },
  { code: 'PEN', name: 'Soles peruanos', symbol: 'S/' },
  { code: 'MXN', name: 'Pesos mexicanos', symbol: '$' },
  { code: 'COP', name: 'Pesos colombianos', symbol: '$' },
  { code: 'ARS', name: 'Pesos argentinos', symbol: '$' },
  { code: 'CLP', name: 'Pesos chilenos', symbol: '$' },
  { code: 'EUR', name: 'Euros', symbol: '€' },
];

export const convertPrice = (amount: number, toCurrency: CurrencyCode): number => {
  if (!exchangeRates[toCurrency]) {
    return amount; // Si la moneda no existe, devolver el monto original
  }
  
  return amount * exchangeRates[toCurrency];
};

export const formatCurrency = (amount: number, currencyCode: CurrencyCode): string => {
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return `$${amount.toFixed(2)}`;
  
  return `${currency.symbol}${amount.toFixed(2)}`;
};
