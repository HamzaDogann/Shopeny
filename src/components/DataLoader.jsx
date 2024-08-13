import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../store/slices/preLoaderSlice";
import { fetchUserData } from "../store/slices/Auth/authActions";
import { fetchFavoriteProductsRef, fetchProducts } from "../store/thunks/User/favoriteProductThunk";
import { getUserId } from "../store/utils/getUserId";

const DataLoader = ({ children }) => {

    const dispatch = useDispatch();
    const userId = getUserId();
    const { favoriteProductsRef } = useSelector((state) => state.favoriteProducts);

    //User Data
    useEffect(() => {
        const loadData = async () => {
            dispatch(startLoading());
            await dispatch(fetchUserData());
            dispatch(stopLoading());
        };

        loadData();
    }, []);


    //Favorite Products
    useEffect(() => {
        dispatch(fetchFavoriteProductsRef({ userId }));

        if (favoriteProductsRef.length > 0) {
            dispatch(fetchProducts(favoriteProductsRef));
        }
    }, [dispatch, userId]);

    return <>{children}</>;
};

export default DataLoader;