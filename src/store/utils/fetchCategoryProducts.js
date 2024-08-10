import { ref, get, child } from 'firebase/database';
import { db } from '../../services/firebase/config';

export const fetchCategoryProducts = async (categoryName) => {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `Data/Categories/${categoryName}`));

        if (snapshot.exists()) {
            const productsData = snapshot.val();
            const productsArray = Object.keys(productsData).map((productId) => ({
                Id: productId,
                categoryName: productsData[productId].categoryName,
                productBrand: productsData[productId].productBrand,
                productName: productsData[productId].productName,
                productStar: productsData[productId].productStar,
                createdDate: productsData[productId].createdDate,
                productNormalPrice: productsData[productId].productNormalPrice,
                discountRate: productsData[productId].discountRate,
                discountedPrice: productsData[productId].discountedPrice,
                isStock: productsData[productId].isStock,
                productImages: {
                    mainImage: productsData[productId].productImages?.mainImage || ''
                }
            }));
            return productsArray;
        } else {
            return [];
        }
    } catch (error) {
        throw new Error('Veri çekilemedi');
    }
};
