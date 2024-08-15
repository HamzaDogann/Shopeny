export const updateBasketInformation = (basketProducts, information) => {
    return {
        ...information,
        productsNumber: basketProducts.length,
        productPrices: basketProducts.reduce((total, product) => total + (product.discountedPrice * product.amount), 0),
        totalPrice: basketProducts.reduce((total, product) => total + (product.discountedPrice * product.amount), 0) + information.cargoPrice,
    };
};