import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import FullsizePageRoutes from './routes/FullsizePageRoutes.jsx';

import PreLoader from "./components/PreLoader/PreLoader.jsx";
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
      {/* General Components */}
      {isLoading && <PreLoader />}
      <Toaster position="top-center" />

      {/* Necessary Data & Pages */}
      <DataLoader>
        {/* Sign & About Pages */}
        <FullsizePageRoutes />
        <Layout>
          <Container>
            <Header />
            <Categories />
          </Container>
          <Breadcrumbs />
          <Container>
            {/* Header - *AppRoutes* - Footer*/}
            <AppRoutes />
          </Container>
          <Footer />
        </Layout>
      </DataLoader>
    </>
  );
}

export default App;
