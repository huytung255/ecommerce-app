import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ProductDetails from "./components/Menu/ProductDetails";
import Checkout from "./components/Checkout/Checkout";
import Profile from "./components/User/Profile";
import Orders from "./components/User/Order";
import Footer from "./components/Footer/Footer";
// import { Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProfile from "./components/User/EditProfile";
import ChangePassword from "./components/User/ChangePassword";
import OrderDetails from "./components/User/OrderDetails";
// import { createBrowserHistory } from "history";
import axios from "axios";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// const history = createBrowserHistory({
//   forceRefresh: true,
// });
const UNAUTHORIZED = 401;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      localStorage.removeItem("user");
      // history.push("/login");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
function App() {
  let [cart, setCart] = useState({
    items: {},
    totalQty: 0,
    totalPrice: 0,
  });

  let localCart = localStorage.getItem("cart");
  const addItemToCart = (item, qty = 1) => {
    let cartCopy = cart;
    const { _id } = item;
    let existingItem = cartCopy.items[_id];
    if (!existingItem) {
      //if item doesn't exist, simply add it
      existingItem = cartCopy.items[_id] = { item: item, qty: 0, price: 0 };
    }
    existingItem.qty += qty;
    existingItem.price = existingItem.item.PRICE * existingItem.qty;
    cartCopy.totalQty += qty;
    cartCopy.totalPrice += existingItem.item.PRICE;

    //update app state
    setCart({ ...cartCopy }); //THe spreading is important!
  };
  useEffect(() => {
    //Check token's expiration
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const expiresOn = new Date(user.expiresOn);
      const currentDate = new Date();
      if (expiresOn < currentDate) {
        localStorage.removeItem("user");
      }
    }

    //load persisted cart into state if it exists
    if (localCart) setCart(JSON.parse(localCart));
  }, []);
  useEffect(() => {
    //make cart a string and store in local space
    let stringCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringCart);
  }, [cart]);

  return (
    // <Router history={history}>
    <>
      <Router>
        <ScrollToTop />
        <NavBar cartTotalQty={cart.totalQty} />
        <Switch>
          <Route path="/" exact>
            <Home addItemToCart={addItemToCart} />
          </Route>
          <Route path="/menu" exact>
            <Menu addItemToCart={addItemToCart} />
          </Route>
          <Route path="/cart" exact>
            <Cart cart={cart} setCart={setCart} />
          </Route>
          <Route path="/menu/:id" exact>
            <ProductDetails addItemToCart={addItemToCart} />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:token" exact>
            <ResetPassword />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/profile/orders" exact>
            <Orders />
          </Route>
          <Route path="/profile/orders/:id" exact>
            <OrderDetails />
          </Route>
          <Route path="/profile/edit" exact>
            <EditProfile />
          </Route>
          <Route path="/profile/change-password" exact>
            <ChangePassword />
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} setCart={setCart} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
