
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

// Función para convertir precios de USD a cualquier moneda
export const convertPrice = (amount: number, toCurrency: CurrencyCode): number => {
  if (!exchangeRates[toCurrency]) {
    return amount; // Si la moneda no existe, devolver el monto original
  }
  
  return amount * exchangeRates[toCurrency];
};

// Función para formatear precios según la moneda
export const formatCurrency = (amount: number, currencyCode: CurrencyCode): string => {
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return `$${amount.toFixed(2)}`;
  
  return `${currency.symbol}${amount.toFixed(2)}`;
};

// Función para convertir de cualquier moneda a USD
export const convertToUSD = (amount: number, fromCurrency: CurrencyCode): number => {
  if (fromCurrency === 'USD') return amount;
  if (!exchangeRates[fromCurrency]) return amount;
  
  // Convertir de la moneda origen a USD
  return amount / exchangeRates[fromCurrency];
};

// Función para mostrar el precio en formato original y su equivalente en USD
export const formatPriceWithUSDEquivalent = (amount: number, currencyCode: CurrencyCode): string => {
  // Si ya está en USD, solo devolver el formato
  if (currencyCode === 'USD') {
    return formatCurrency(amount, currencyCode);
  }
  
  // El amount ya está en USD, así que lo convertimos a la moneda local
  const convertedAmount = convertPrice(amount, currencyCode);
  const formattedConvertedPrice = formatCurrency(convertedAmount, currencyCode);
  const formattedUsdPrice = formatCurrency(amount, 'USD');
  
  return `${formattedConvertedPrice} (≈ ${formattedUsdPrice})`;
};
