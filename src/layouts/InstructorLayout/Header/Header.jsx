import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import config from '../../../config'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react'
import { ModalContext } from '../../../components/ModalProvider/ModalProvider'
import images from '../../../assets/images'
import requests from '../../../utils/requests'

const cx = classNames.bind(styles)
const API_GET_PROFILE = "User/GetUserProfile";

function Header() {
    const { user } = useContext(ModalContext);
  const {setAuth, setUser} = useContext(ModalContext);
  const navigate = useNavigate();
  const [fetchUser, setFetchUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await requests.get(API_GET_PROFILE);
      if (response.data) {
        setFetchUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const signOut = () => {
    Cookies.remove('authToken');
    setAuth(null);
    setUser(null);
    navigate(config.routes.home);
};

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className={cx("dashboardHeader")}>
        <div className={cx("avatar")}>
          <img
            src={fetchUser?.avatar || images.defaultAvatar}
            alt="avatar"
          />
          <strong>{fetchUser?.fullName || user.fullName}</strong>
        </div>
        <div className={cx("headerActions")}>
          <ul className={cx("navbar")}>
              <Link to={'/'}>
            <li className={cx("nav-item")}>
                <i class="bi bi-house"></i> Dashboard
            </li>
              </Link>
              <Link to={config.routes.profileInstructor}>
            <li className={cx("nav-item")}>
                <i class="bi bi-person"></i> Profile
            </li>
              </Link>
              <Link to={config.routes.instructorCourses}>
            <li className={cx("nav-item")}>
                <i class="bi bi-calendar3"></i> Course
            </li>
              </Link>
              <Link to={config.routes.instructorFeedback}>
            <li className={cx("nav-item")}>
                <i class="bi bi-pencil-square"></i> Feedback
            </li>
              </Link>

              <Link to={"/"}>
            <li className={cx("nav-item")}>
                <i class="bi bi-ban"></i> Report
            </li>
              </Link>

              <Link to={config.routes.instructorLectures}>
            <li className={cx("nav-item")}>
                <i class="bi bi-file-earmark-play"></i> Lectures
            </li>
              </Link>

              <Link to={config.routes.instructorWallet}>
            <li className={cx("nav-item")}>
                <i class="bi bi-wallet"></i> Wallet
            </li>
              </Link>
          </ul>
        </div>
        <div className={cx('btnLogout')} onClick={signOut}>
          <span>LogOut</span>
          <LogOut size={15}/>
        </div>
      </div>
  )
}

export default Header