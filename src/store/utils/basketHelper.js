export const updateBasketInformation = (basketProducts, information) => {
  
    const totalProductPrices = basketProducts.reduce((total, product) => total + (product.discountedPrice * product.amount), 0);
    const discountedPrice = totalProductPrices * (information.promotionDiscount / 100);
    const totalPriceAfterDiscount = totalProductPrices - discountedPrice;
  
    return {
        ...information,
        productsNumber: basketProducts.reduce((total, product) => total + product.amount, 0),
        productPrices: totalProductPrices,
        totalPrice: Math.round(totalPriceAfterDiscount + information.cargoPrice)

    };
};
