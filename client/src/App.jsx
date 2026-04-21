import { Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";

import Footer from "./component/layout/Footer/Footer";
import "./App.css";
import CartProvider from "./context/CartContext/CartContext";
import WishlistProvider from "./context/WishlistContext/WishlistContext";
import AuthProvider from "./context/AuthContext/AuthContext";
import AuthLogin from "./pages/AuthPage/AuthLogin";
import AuthRegister from "./pages/AuthPage/AuthRegister";

function App() {
    return (
        <>
            <div className="app">
                <AuthProvider>
                    {" "}
                    <CartProvider>
                        <WishlistProvider>
                            <Header />
                            <main className="main">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route
                                        path="/auth/login"
                                        element={<AuthLogin />}
                                    />
                                    <Route
                                        path="/auth/register"
                                        element={<AuthRegister />}
                                    />
                                    <Route
                                        path="/catalog"
                                        element={<CatalogPage />}
                                    />
                                    <Route
                                        path="/product/:slug"
                                        element={<ProductPage />}
                                    />
                                    <Route
                                        path="/cart"
                                        element={<CartPage />}
                                    />
                                    <Route
                                        path="/wishlist"
                                        element={<WishlistPage />}
                                    />

                                    <Route
                                        path="/checkout"
                                        element={<CheckoutPage />}
                                    />
                                    <Route
                                        path="/orders"
                                        element={<OrdersPage />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={<ProfilePage />}
                                    />
                                </Routes>
                            </main>

                            <Footer />
                        </WishlistProvider>
                    </CartProvider>
                </AuthProvider>
            </div>
        </>
    );
}

export default App;
