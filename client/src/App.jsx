import { Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Footer from "./component/layout/Footer/Footer";
import "./App.css";

function App() {
    return (
        <>
            <div className="app">
                <Header />
                <main className="main">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<LoginPage />} />
                        <Route path="/auth" element={<LoginPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default App;
