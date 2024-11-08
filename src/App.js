import { Fragment, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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

function App() {
  const { user } = useContext(ModalContext);
  const authToken = Cookies.get("authToken");

  const renderRoute = (route, index) => {
    const Page = route.component;
    let Layout = route.layout || DefaultLayout;

    if (route.layout === null) {
      Layout = Fragment;
    }

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
    switch (user?.roleName) {
      case "Student":
        return studentRoutes;
      case "Instructor":
        return instructorRoutes;
      case "Admin":
        return adminRoutes;
      default:
        return [];
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {publicRoutes.map(renderRoute)}

          {authToken && (
            <Route element={<RequireAuth allowedRoles={[user?.roleName]} />}>
              {getRoleRoutes().map(renderRoute)}
            </Route>
          )}

          {/* Optional: Redirect any unmatched route to "/unauthorized" */}
          {/* <Route path="*" element={<Navigate to="/unauthorized" replace />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
