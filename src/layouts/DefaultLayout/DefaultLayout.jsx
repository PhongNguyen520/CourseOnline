import classNames from 'classnames/bind';
import { useContext } from 'react';


import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import SignUp from '../../components/Modals/SignUp';
import Login from '../../components/Modals/Login';
import { ModalContext } from '../../components/ModalProvider/ModalProvider';


function DefaultLayout({ children }) {
    const {activeLogIn, activeSignUp } = useContext(ModalContext);
    return (
        <div>
            <div>
                <Header />
                {children}
                <ScrollToTop />
                <Footer />
            </div>
           
            {activeLogIn && <Login />}
                {activeSignUp && <SignUp />}
        </div>
    );
}

export default DefaultLayout;
