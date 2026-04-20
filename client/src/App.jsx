import { Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";

import Footer from "./component/layout/Footer/Footer";
import "./App.css";
import CartProvider from "./context/CartContext/CartContext";

function App() {
    return (
        <>
            <div className="app">
                <CartProvider>
                    <Header />
                    <main className="main">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/auth" element={<LoginPage />} />
                            <Route path="/catalog" element={<CatalogPage />} />
                            <Route
                                path="/product/:slug"
                                element={<ProductPage />}
                            />
                            <Route path="/cart" element={<CartPage />} />
                            <Route
                                path="/checkout"
                                element={<CheckoutPage />}
                            />
                            <Route path="/orders" element={<OrdersPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </Routes>
                    </main>

                    <Footer />
                </CartProvider>
            </div>
        </>
    );
}

export default App;
