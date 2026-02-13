export function getRandomNumber(min = 0, max = 9999): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomMobileNumber(): string {
    const prefix = '06'
    const middle = getRandomNumber(100, 999);
    const last = getRandomNumber(10000, 99999);
    return `${prefix}${middle}${last}`;
}

export function getRandomEmail(): string {
    return `thanaphong.k+${Date.now()}@doppiotech.com`;
}
