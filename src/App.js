import './App.css';
import Header from "./layouts/Header/Header";
import { useContext } from 'react';
import { ModalContext } from "./components/ModalProvider/ModalProvider";
import Login from "./components/Modals/Login";
import SignUp from "./components/Modals/SignUp";
import Footer from "./layouts/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from "./routes/routes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ChatFeature from "./pages/Home/Chat/ChatFeature";

function App() {
    const { activeLogIn, activeSignUp } = useContext(ModalContext);
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page />}
                            />
                        );
                    })}
                </Routes>
                <ChatFeature />
                <ScrollToTop/>
                <Footer />
            </Router>
            {activeLogIn && <Login />}
            {activeSignUp && <SignUp />}
        </div>
    );
}

export default App;
