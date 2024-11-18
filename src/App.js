import { Fragment, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ModalContext } from "./components/ModalProvider/ModalProvider";
import {
  publicRoutes,
  studentRoutes,
  instructorRoutes,
  adminRoutes,
} from "../src/routes/routes";
import RequireAuth from "./pages/RequireAuth/RequireAuth";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import Cookies from "js-cookie";
import config from "./config";
import LinearProgress from '@mui/material/LinearProgress';

const AppContent = () => {
  const { user } = useContext(ModalContext);
  const authToken = Cookies.get("authToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authToken && user) {
      setLoading(false);
    } else if (!authToken) {
      setLoading(false);
    }
  }, [authToken, user]);

  const renderRoute = (route, index) => {
    const Layout = route.layout === null ? Fragment : route.layout || DefaultLayout;
    const Page = route.component;

    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  };

  const getRoleRoutes = () => {
    const roleRoutesMap = {
      Student: studentRoutes,
      Instructor: instructorRoutes,
      Admin: adminRoutes,
    };
    return roleRoutesMap[user?.roleName] || [];
  };

  if (loading) return <LinearProgress />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={
              authToken
                ? user?.roleName === "Student"
                  ? config.routes.home
                  : user?.roleName === "Instructor"
                  ? config.routes.dashboardInstructor
                  : config.routes.dashboardAdmin
                : config.routes.home
            }
            replace
          />
        }
      />

      {publicRoutes.map(renderRoute)}

      {authToken && (
        <Route element={<RequireAuth allowedRoles={[user?.roleName]} />}>
          {getRoleRoutes().map(renderRoute)}
        </Route>
      )}

      <Route path="*" element={<Navigate to="/unauthorized" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
