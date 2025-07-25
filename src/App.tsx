
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Intro from "./components/Intro";
import MainContent from "./components/MainContent";
import ScrollToTopButton from "./components/ScrollToTopButton";
import CartTableWrapper from "./components/CartTable/CartTableWrapper";

function App() {

   return (
      <>
         <Header />
         <Intro />
         <MainContent />
         <ScrollToTopButton />
         <CartDrawer cartTable={<CartTableWrapper/>}/>
         <Footer />
      </>
   );
}

export default App;
