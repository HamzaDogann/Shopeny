import React from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import Container from "./features/Container/Container.jsx";
import PreLoader from "./features/PreLoader/PreLoader.jsx";
import ResetPassword from "./pages/AuthPages/ResetPassword.jsx";
import SignIn from "./pages/AuthPages/SignIn.jsx";
import SignUp from "./pages/AuthPages/SignUp.jsx";
import Categories from "./shared/components/Categories/Categories.jsx";
import Footer from "./shared/components/Footer/Footer.jsx";
import Header from "./shared/components/Header/Header";

import DataLoader from './features/DataLoader.jsx';
import Layout from './features/Layout/Layout.jsx';
import AuthProtectedRoute from './routes/AuthProtectedRoute.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {

  const isLoading = useSelector((state) => state.preLoader.isLoading);

  return (
    <>
      {isLoading && <PreLoader />}
      <Toaster position="top-center" />
      <Routes>
        <Route path="giris-yap" element={<AuthProtectedRoute element={<SignIn />} />} />
        <Route path="uye-ol" element={<AuthProtectedRoute element={<SignUp />} />} />
        <Route path="sifre-yenileme" element={<AuthProtectedRoute element={<ResetPassword />} />} />
      </Routes>

      <DataLoader>
        <Layout>
          <Container>
            <Header />
            <Categories />
            <AppRoutes />
          </Container>
          <Footer />
        </Layout>
      </DataLoader>
    </>
  );
}

export default App;
