import React from 'react';
import { useSelector } from 'react-redux';
import Container from "./features/Container/Container.jsx";
import PreLoader from "./features/PreLoader/PreLoader.jsx";
import ResetPassword from "./pages/AuthPages/ResetPassword.jsx";
import SignIn from "./pages/AuthPages/SignIn.jsx";
import SignUp from "./pages/AuthPages/SignUp.jsx";
import Categories from "./shared/components/Categories/Categories.jsx";
import Footer from "./shared/components/Footer/Footer.jsx";
import Header from "./shared/components/Header/Header";
import { Toaster } from 'react-hot-toast';

function App() {

  const isLoading = useSelector((state) => state.preLoader.isLoading);

  return (
    <>
      {isLoading && <PreLoader />}
      <Toaster position="top-center" />
      {/* <Container>
        <Header />
        <Categories />
      </Container>
      <Footer /> */}

      {/* <SignIn /> */}
      <SignUp />
      {/* <ResetPassword /> */}
    </>
  );
}

export default App;
