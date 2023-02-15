import Header from "../../common/Header";
// import AddListing from '../AddListing/Index';
import Expanded from "../Expanded";
// import Marketplace from '../Marketplace';
// import ProfileAdvertiser from '../Profile/ProfileAdvertiser';
import SignIn from "../SignIn";
import SignUp from "../SignUp";
// import WalletAdvertiser from "../WalletAdvertiser/newWalletComponent/index";
import WalletAdvertiser from "../WalletAdvertiser";
import WalletPublisher from "../WalletPublisher";
import CommonPopup from "../../common/Popup";
import Cart from "../Cart";

import "./App.scss";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import MarketPlace from "../Marketplace/marketplace/MarketPlace";
// import Expand from "../Expanded/expand/Expand";
// import WalletPublisher from "../WalletPublisher/walletPublisher/WalletPublisher";
// import ProfileAdvertiser from '../Profile/profileAdvertiser/ProfileAdvertiser';
import ProfileAdvertiser from "../Profile/ProfileAdvertiser";
// import WithdrawlPublisher from "../withdrawlPublisher/WithdrawlPublisher";
import WithdrawlPublisher from "../withdrawlPublisher/index";
import Popup from "../../common/Popup/popup/Popup";
import AddListing from "../AddListing/Index";
import Desktop from "../desktop/Desktop";
import { AlertDialog } from "../../common/alertDialogue/AlertDialog";
// import Navbar from "../../common/Header/Navbar";
import StripeContainer from "../Cart/stripe/StripeContainer";
import OrderSuccess from "../Cart/orderSuccess/OrderSuccess";
import OrderDetails from "../Cart/orderSuccess/OrderSuccess";
import { UserAuthentication } from "../../common/userAuthentication/UserAuthentication";
import ForgotPassword from "../forgetPassword/ForgetPassword";
import PasswordReset from "../passwordReset";
import { SnackbarNotification } from "../../common/snackbar/SnackBarNotification";
import NewsPopup from "../desktop/NewsPopup";
import { Box } from "@mui/material";
import TabLevelLoader from "../loader/Loader";
import Footer from "../footer/Footer";
import VerifyEmailPopup from "../popups/VerifyEmailPopup";
import { useSelector } from "react-redux";

// import Cart from "../Cart/cart/Cart";

function App(props) {
  // const userEmail = useSelector((state) => state?.cart?.userData?.user?.email);
  // const userId = useSelector((state) => state?.cart?.userData?.user?._id);
  return (
    <div className="App">
      {/* <NewsPopup/> */}
      <HashRouter>
        <Header />
        <SnackbarNotification />
        {/* <Box
              id="Main"
              sx={{
                height: "auto",
                position: "absolute",
                top: "6em",
                left: "3.5em",
                width: "96%",
              }}
            >
              <TabLevelLoader />
            
            </Box> */}

        {/* <SettingsComponent /> */}
        {/* <NewsOpen /> */}
        {/* <Update /> */}
        {/* <Home /> */}
        {/* <CategoryExtended /> */}
        {/* <HomeExtended /> */}
        {/* <Desktop /> */}
        <Routes>
          {/* <Route path="/" exact element={<Desktop />} /> */}
          <Route path="/" exact element={<MarketPlace />} />
          <Route path="/expand/:id" exact element={<Expanded />} />
          <Route path="/checkout" exact element={<StripeContainer />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/checkout-success" exact element={<OrderSuccess />} />
          <Route path="/wallet-publisher" exact element={<WalletPublisher />} />
          <Route
            path="/withdrawl-publisher"
            exact
            element={<WithdrawlPublisher />}
          />
          <Route
            path="/wallet-advertiser"
            exact
            element={<WalletAdvertiser />}
          />
          <Route path="/profile" exact element={<ProfileAdvertiser />} />
          <Route path="/add-listing" exact element={<AddListing />} />
          <Route
            path="/forget-password"
            exact
            element={
              <Popup
                title="Set New Password"
                name1="newPass"
                label1="Enter New Password"
                name2="confPass"
                label2="Confirm New Password"
                buttonText="Submit"
              />
            }
          />
          <Route
            path="/VerifyEmail"
            exact
            element={
              // <Popup
              //   title="Verify Email"
              //   name1="otp"
              //   label1="Enter Otp"

              //   buttonText="Submit"
              // />
              <VerifyEmailPopup
              //  userId={userId} email={userEmail}
              />
            }
          />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/order-details" exact element={<OrderDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
        </Routes>
      </HashRouter>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
