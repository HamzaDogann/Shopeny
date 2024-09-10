import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import AuthProtectedRoute from "./AuthProtectedRoute";
import ResetPassword from "../pages/AuthPages/ResetPassword";
import PreLoader from "../components/PreLoader/PreLoader.jsx";
const About = lazy(() => import('../components/AboutShopeny/About.jsx'));

const FullsizePageRoutes = () => {
    return (
        <Routes>
            <Route path="giris-yap" element={<AuthProtectedRoute element={<SignIn />} />} />
            <Route path="uye-ol" element={<AuthProtectedRoute element={<SignUp />} />} />
            <Route path="sifre-yenileme" element={<AuthProtectedRoute element={<ResetPassword />} />} />
            <Route path="hakkimizda" element={<Suspense fallback={<PreLoader />}><About /></Suspense>}/>
        </Routes>
    )
}

export default FullsizePageRoutes;
