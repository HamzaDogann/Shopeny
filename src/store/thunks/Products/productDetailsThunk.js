import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, ref } from 'firebase/database';
import { db } from '../../../services/firebase/config';
import { formatProductName } from '../../../shared/utils/formatProductName';
import { categoryTranslation } from '../../../constants/categories';

export const fetchProductDetailsByName = createAsyncThunk(
  'productDetails/fetchProductDetailsByName',
  async ({ categoryName, productName }, thunkAPI) => {
    try {

      const englishCategoryName = categoryTranslation[categoryName];
      const formattedProductName = formatProductName(productName).toLowerCase();
  
      const productsRef = ref(db, `Data/Categories/${englishCategoryName}`);
      const snapshot = await get(productsRef);

      if (snapshot.exists()) {
  
        const products = snapshot.val();
        const matchingProductId = Object.keys(products).find(productId => 
          products[productId].productName.toLowerCase() === formattedProductName
        );
        
        if (matchingProductId) {
          const productData = products[matchingProductId];
          return { productId: matchingProductId, productData };
        } else {
          return thunkAPI.rejectWithValue("product-not-found");
        }
      } else {
        return thunkAPI.rejectWithValue("product-not-found");
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Bilinmeyen bir hata meydana geldi");
    }
  }
);
