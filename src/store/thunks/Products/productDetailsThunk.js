import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, ref, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../../services/firebase/config';
import { formatProductName } from '../../../shared/utils/formatProductName';
import { categoryTranslation } from '../../../constants/categories';

export const fetchProductDetailsByName = createAsyncThunk(
  'productDetails/fetchProductDetailsByName',
  async ({ categoryName, productName }, thunkAPI) => {
    try {

      const englishCategoryName = categoryTranslation[categoryName];
      const formattedProductName = formatProductName(productName);

      const productsRef = ref(db, `Data/Categories/${englishCategoryName}`);
      const productQuery = query(productsRef, orderByChild('productName'), equalTo(formattedProductName));
      const snapshot = await get(productQuery);

      if (snapshot.exists()) {
        const productId = Object.keys(snapshot.val())[0];
        const productData = snapshot.val()[productId];
        return { productId, productData };
      } else {
        return thunkAPI.rejectWithValue("product-not-found");
      }
    } catch {
      return thunkAPI.rejectWithValue("Bilinmeyen bir hata meydana geldi");
    }
  }
);

