import config from "../config";

import Home from "../pages/Home/HomePage";
import RegisterInstructor from "../pages/Register/RegisterInstructor";
import RegisterStudent from "../pages/Register/RegisterStudent";
import SearchCourses from "../pages/SearchCourse/SearchCourse";
import CourseDetail from "../pages/CourseDetail/CourseDetail";

const publicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.registerInstructor, component: RegisterInstructor},
    {path: config.routes.registerStudent, component: RegisterStudent},
    {path: config.routes.searchCourses, component: SearchCourses},
    {path: config.routes.courseDetail, component: CourseDetail},
]

const privateRoutes = [
    {path: config.routes.home, component: Home, role: ['Student, Instructor']},
    {path: config.routes.registerInstructor, component: RegisterInstructor, role: ['Student, Instructor']},
]

export { publicRoutes, privateRoutes };