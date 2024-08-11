/**
 *  @param {number} amount - 
 *  @returns {string} - 
 */
export const formatPrice = (amount) => {
  
    if (isNaN(amount)) {
        throw new Error('Geçersiz sayı');
    }
    return new Intl.NumberFormat('tr-TR').format(amount);
};