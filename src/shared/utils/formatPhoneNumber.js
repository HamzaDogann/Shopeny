export function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber || phoneNumber === "belirtilmedi") {
        return '05XX XXX XX 90';
    }
    const formattedNumber = `05XX XXX XX ${phoneNumber.slice(-2)}`;

    return formattedNumber;
}
