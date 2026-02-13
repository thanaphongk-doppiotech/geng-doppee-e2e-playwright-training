export function convertCurrencyToNumber(currencyString: string): number {
    return Number(currencyString.replace(/,/g, ''));
}

export function convertNumberToCurrency(number: number, minDecimal: number = 2): string {
    return (number).toLocaleString('en-US', { minimumFractionDigits: minDecimal });
}
