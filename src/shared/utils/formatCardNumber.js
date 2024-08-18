export function formatCardNumber(cardNumber) {
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
}