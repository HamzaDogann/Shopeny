export const filterProducts = (products, filters) => {
    return products
        .filter(product => filters.brands.length === 0 || filters.brands.includes(product.productBrand))
        .filter(product => {
            const price = product.discountedPrice;
            return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        })
        .filter(product => filters.colors.length === 0 || filters.colors.includes(product.productColor))
        .filter(product => product.productStar >= filters.rating)
        .filter(product => !filters.isStock || product.isStock)
        .sort((a, b) => {
            switch (filters.sortOption) {
                case 'priceAsc':
                    return a.discountedPrice - b.discountedPrice;
                case 'priceDesc':
                    return b.discountedPrice - a.discountedPrice;
                case 'oldToNew':
                    return new Date(a.createdDate) - new Date(b.createdDate);
                case 'newToOld':
                    return new Date(b.createdDate) - new Date(a.createdDate);
                default:
                    return 0;
            }
        });
};
