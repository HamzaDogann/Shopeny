import Container from "./features/Container/Container.jsx";
import ResetPassword from "./pages/AuthPages/ResetPassword.jsx";
import SignIn from "./pages/AuthPages/SignIn.jsx";
import SignUp from "./pages/AuthPages/SignUp.jsx";
import Categories from "./shared/components/Categories/Categories.jsx";
import Footer from "./shared/components/Footer/Footer.jsx";
import Header from "./shared/components/Header/Header";

import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <Toaster position="top-center" />
      {/* <Container>
        <Header />
        <Categories />
      </Container>
      <Footer /> */}

      <SignIn />
      {/* <SignUp /> */}
      {/* <ResetPassword /> */}


    </>
  )
}

export default App
