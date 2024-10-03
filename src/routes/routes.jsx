import config from "../config";

import Home from "../pages/Home/HomePage";
import RegisterInstructor from "../pages/Register/RegisterInstructor";
import RegisterStudent from "../pages/Register/RegisterStudent";

const publicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.registerInstructor, component: RegisterInstructor},
    {path: config.routes.registerStudent, component: RegisterStudent},
]

const privateRoutes = [
    {path: config.routes.home, component: Home, role: ['Student, Instructor']},
    {path: config.routes.registerInstructor, component: RegisterInstructor, role: ['Student, Instructor']},
]

export { publicRoutes, privateRoutes };