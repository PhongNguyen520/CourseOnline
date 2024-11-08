import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { ModalContext } from '../../components/ModalProvider/ModalProvider';

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useContext(ModalContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.roleName)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;