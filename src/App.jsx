import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Contact from "./pages/contact";
import Checkout from "./pages/checkout";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/LoginRegister/LoginPage";
import RegisterPage from "./pages/LoginRegister/RegisterPage";
import AccountDetails from "./pages/myAccount/AccountDetails";
import ViewProductsDetails from "./pages/products/ViewProductsDetails";
import AllProducts from "./pages/shop/AllProducts";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutFailed from "./pages/CheckoutFailed";
import WishlistData from "./pages/WishlistData";
import ForgotPassword from "./components/LoginRegister/ForgotPassword";
import ResetPassword from "./components/LoginRegister/ResetPassword";
import OrdersModel from "./components/MyAccount/OrdersModel";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import WhatsappButton from "./components/common/WhatsappButton";
import ChangePasswordPage from "./pages/myAccount/ChangePasswordPage";
import AddressBookPage from "./pages/myAccount/AddressBookPage";
import MyOrdersPage from "./pages/myAccount/MyOrdersPage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <Header />
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/viewProducts/:id" element={<ViewProductsDetails />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/order/details/:orderId" element={<OrdersModel />} />
        <Route path="/wishlist" element={<WishlistData />} />
        <Route path="/success" element={<CheckoutSuccess />} />
        <Route path="/cancel" element={<CheckoutFailed />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/user/reset-password/:userId"
          element={<ResetPassword />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/profile-details" element={<AccountDetails />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/address-book" element={<AddressBookPage />} />
      </Routes>
      <Footer />
      <WhatsappButton phoneNumber={+911234567890} />
    </MantineProvider>
  );
}

export default App;
