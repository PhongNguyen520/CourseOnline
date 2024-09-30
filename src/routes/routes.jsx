import config from "../config";

import Home from "../pages/Home/HomePage";
import Register from "../pages/Register/Register";

const publicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.register, component: Register},
]

const privateRoutes = [
    {path: config.routes.home, component: Home, role: ['Student, Instructor']},
    {path: config.routes.register, component: Register, role: ['Student, Instructor']},
]

export { publicRoutes, privateRoutes };