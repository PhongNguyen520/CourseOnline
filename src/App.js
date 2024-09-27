import './App.css';
import HomePage from "./pages/Home/HomePage";
import Header from "./layouts/Header/Header";
import {useContext} from 'react';
import {ModalContext} from "./components/ModalProvider/ModalProvider";
import Login from "./components/Modals/Login";
import SignUp from "./components/Modals/SignUp";
import Footer from "./layouts/Footer/Footer";

function App() {
    const {activeLogIn, activeSignUp} = useContext(ModalContext);
    return (
        <div className="App">
            <div>
                <Header></Header>
                <HomePage></HomePage>
                <Footer></Footer>
            </div>
            {activeLogIn && <Login></Login>}
            {activeSignUp && <SignUp></SignUp>}
        </div>
    );
}

export default App;
