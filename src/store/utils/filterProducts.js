export const filterProducts = (products, filters) => {
    return products
        .filter(product => filters.brands.length === 0 || filters.brands.includes(product.productBrand))
        .filter(product => {
            const price = product.discountedPrice || 0;
            return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        })
        .filter(product => {
            const productColors = product.productColors || [];
            return filters.colors.length === 0 || filters.colors.some(color => productColors.includes(color));
        })
        .filter(product => product.productStar >= filters.rating)
        .filter(product => !filters.isStock || product.isStock)
        .sort((a, b) => {
            switch (filters.sortOption) {
                case 'priceAsc':
                    return (a.discountedPrice || 0) - (b.discountedPrice || 0);
                case 'priceDesc':
                    return (b.discountedPrice || 0) - (a.discountedPrice || 0);
                case 'oldToNew':
                    return new Date(a.createdDate || 0) - new Date(b.createdDate || 0);
                case 'newToOld':
                    return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
                default:
                    return 0;
            }
        });
};
