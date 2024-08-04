import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import AuthProtectedRoute from "./routes/AuthProtectedRoute.jsx"

import PreLoader from "./components/PreLoader/PreLoader.jsx";
import ResetPassword from "./pages/AuthPages/ResetPassword.jsx";
import SignIn from "./pages/AuthPages/SignIn.jsx";
import SignUp from "./pages/AuthPages/SignUp.jsx";
import Categories from "./shared/components/Categories/Categories.jsx";
import Footer from "./shared/components/Footer/Footer.jsx";
import Header from "./shared/components/Header/Header";

import DataLoader from './components/DataLoader.jsx';
import Layout from './shared/layout/Layout.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import Container from './shared/container/Container.jsx';
import Breadcrumbs from './shared/components/Breadcrumbs/Breadcrumbs.jsx';

function App() {

  const isLoading = useSelector((state) => state.preLoader.isLoading);
  
  return (
    <>
      {isLoading && <PreLoader />}
      <Toaster position="top-center" />

      <DataLoader>
        <Routes>
          <Route path="giris-yap" element={<AuthProtectedRoute element={<SignIn />} />} />
          <Route path="uye-ol" element={<AuthProtectedRoute element={<SignUp />} />} />
          <Route path="sifre-yenileme" element={<AuthProtectedRoute element={<ResetPassword />} />} />
        </Routes>
        <Layout>
          <Container>
            <Header />
            <Categories />
          </Container>
          <Breadcrumbs />
          <Container>
            <AppRoutes />
          </Container>
          <Footer />
        </Layout>
      </DataLoader>
    </>
  );
}

export default App;
