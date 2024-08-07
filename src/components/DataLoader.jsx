import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../store/slices/preLoaderSlice";
import { useEffect } from "react";
import { fetchUserData } from "../store/slices/Auth/authActions";

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



    return <>{children}</>;
};

export default DataLoader;