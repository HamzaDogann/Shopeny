export const updateBasketInformation = (basketProducts, information) => {
    return {
        ...information,
        productsNumber: basketProducts.reduce((total, product) => total + product.amount, 0),
        productPrices: basketProducts.reduce((total, product) => total + (product.discountedPrice * product.amount), 0),
        totalPrice: basketProducts.reduce((total, product) => total + (product.discountedPrice * product.amount), 0) + information.cargoPrice,
    };
};