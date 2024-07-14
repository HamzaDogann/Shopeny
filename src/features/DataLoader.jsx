import { useDispatch} from "react-redux";
import { fetchUserData } from "../store/features/auth/authSlice";
import { startLoading, stopLoading } from "../store/features/PreLoader/preLoaderSlice";
import { useEffect } from "react";

const DataLoader = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            dispatch(startLoading());
            await dispatch(fetchUserData());
            dispatch(stopLoading());
        };

        loadData();
    }, [dispatch]);



    return <>{children}</>;
};

export default DataLoader;