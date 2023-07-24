import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Index } from "./pages/Index";
import About from "./pages/AboutUs";
import Service from "./pages/Services";
import Store from "./pages/Store";
import Dashboard from "./pages/users/Dashboard";
import Profile from "./pages/users/Profile";
import AboutUser from "./pages/users/AboutUser";
import CustomNavbar from "./components/users/Navbar";
import ContactUs from "./pages/ContactUs";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/users/Home";
import { UserProvider } from "./context/UserProvider";
import { Orders } from "./pages/users/Orders";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminHome } from "./pages/admin/Home";
import { AddProducts } from "./pages/admin/AddProducts";
import { AddCategory } from "./pages/admin/AddCategory";
import { ViewCategory } from "./pages/admin/ViewCategory";
import { ViewProducts } from "./pages/admin/ViewProducts";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { ProductView } from "./pages/users/ProductView";
import { CategoryStorePage } from "./pages/users/CategoryStorePage";
import { CartContextProvider } from "./context/CartContextProvider";
import { CartSideBar } from "./pages/CartSideBar";
import { LoadOrders } from "./pages/users/LoadOrders";
import { Loading } from "./components/Loading";
import { useEffect, useState } from "react";
import { privateAxios } from "./services/AxiosService";
import Swal from "sweetalert2";
import { Footer } from "./components/Footer";
import HomePage from "./pages/users/HomePage";
import { ProgressBar } from "react-bootstrap";
import LoadingBar from "react-top-loading-bar";
import AfterPaymentPage from "./pages/users/AfterPaymentPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    privateAxios.interceptors.request.use(
      (config) => {
        setLoading(true);
        // setProgress(40);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // publicAxios.interceptors.request.use(
    //   (config) => {
    //     console.log("loading public axios")
    //     setLoading(true);
    //     // setProgress(40);
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );
    privateAxios.interceptors.response.use(
      (config) => {
        setLoading(false);
        setProgress(100);
        return config;
      },
      (error) => {
        setProgress(100);
        setLoading(false);
        if (error.code === "ERR_NETWORK") {
          Swal.fire({
            title: "Network Error",
            html: "Backend Server is Down",
            icon: "info",
          });
        }
        return Promise.reject(error);
      }
    );
    // publicAxios.interceptors.response.use(
    //   (config) => {
    //     setLoading(false);
    //     setProgress(100);
    //     return config;
    //   },
    //   (error) => {
    //     setProgress(100);
    //     setLoading(false);
    //     if (error.code === "ERR_NETWORK") {
    //       Swal.fire({
    //         title:"Network Error",
    //         html:"Backend Server is Down",
    //         icon:"info"
    //       });
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  }, []);
  return (
    //setting up routes
    <GoogleOAuthProvider clientId="1078535299525-htqhsh99nk7pu8ks2qjb5stje9shsa57.apps.googleusercontent.com">
      <UserProvider>
        <CartContextProvider>
          <BrowserRouter>
            <ToastContainer
              draggable
              transition={Zoom}
              position="bottom-center"
            />
            <LoadingBar
              onLoaderFinished={() => setProgress(0)}
              color="RGB(82, 113, 255)"
              progress={progress}
              waitingTime={1100}
            />
            <CustomNavbar />
            <Loading show={loading} />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Service />} />
              <Route path="/store" element={<Store />} />
              {/* <Route path="/cart" element={<CartSideBar />} /> */}
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/store" element={<Store />} />
              <Route path="/products/:productId" element={<ProductView />} />
              <Route
                path="/store/category/products/:categoryId/:categoryTitle"
                element={<CategoryStorePage />}
              />
              <Route path="/users" element={<Dashboard />}>
                {/* <Route path="home" element={<Index />} /> */}
                <Route path="profile/:userId" element={<Profile />} />
                <Route path="about" element={<AboutUser />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders-details" element={<LoadOrders />} />
                <Route
                  path="orders/payment-success"
                  element={<AfterPaymentPage />}
                />
              </Route>
              <Route path="/admin" element={<AdminDashboard />}>
                <Route path="home" element={<AdminHome />} />
                <Route path="add-product" element={<AddProducts />} />
                <Route path="add-category" element={<AddCategory />} />
                <Route path="categories" element={<ViewCategory />} />
                <Route path="products" element={<ViewProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
