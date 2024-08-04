import { useDispatch, useSelector} from "react-redux";
import { startLoading, stopLoading } from "../store/features/PreLoader/preLoaderSlice";
import { useEffect } from "react";
import { fetchUserData } from "../store/features/auth/authActions";

const DataLoader = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.auth.user);

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