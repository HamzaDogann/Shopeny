import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../store/slices/preLoaderSlice";
import { useEffect } from "react";
import { fetchUserData } from "../store/slices/Auth/authActions";
import { fetchFavoriteProductsRef, fetchProducts } from "../store/thunks/User/favoriteProductThunk";
import { getUserId } from "../store/utils/getUserId";

const DataLoader = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            dispatch(startLoading());
            await dispatch(fetchUserData());
            dispatch(stopLoading());
        };

        loadData();
    }, []);

    const userId = getUserId();
    const { favoriteProductsRef } = useSelector((state) => state.favoriteProducts);


    useEffect(() => {
        dispatch(fetchFavoriteProductsRef({ userId }));
    }, [dispatch, userId]);

    useEffect(() => {
        if (favoriteProductsRef.length > 0) {
            dispatch(fetchProducts(favoriteProductsRef));
        }
    }, []);

    return <>{children}</>;
};

export default DataLoader;