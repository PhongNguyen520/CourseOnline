import config from "../config";

import Home from "../pages/Home/HomePage";
import RegisterInstructor from "../pages/Register/RegisterInstructor";
import RegisterStudent from "../pages/Register/RegisterStudent";
import SearchCourses from "../pages/SearchCourse/SearchCourse";
import CourseDetail from "../pages/CourseDetail/CourseDetail";
import Profile from "../pages/Profile/Profile";
import ExcellentInstructor from "../pages/ExcellentInstructor/ExcellentInstructor";
import PracticeQuiz from "../pages/PracticeQuiz/PracticeQuiz";
import InstructorDetail from "../pages/InstructorDetail/InstructorDetail";
import AuthGoogle from "../pages/AuthGoogle/AuthGoogle";
import Cart from "../pages/Cart/Cart";
import BookMark from "../pages/Bookmark/Bookmark";
import TakeQuiz from "../pages/TakeQuiz/TakeQuiz";
import DashboardInstructor from "../pages/DashBoardInstructor/DashBoardInstructor";
import MyClasses from "../pages/MyClasses/MyClasses";
import Wallet from "../pages/Wallet/Wallet";
import DashBoardAdmin from "../pages/DashBoardAdmin/DashBoardAdmin";

const publicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.registerInstructor, component: RegisterInstructor},
    {path: config.routes.registerStudent, component: RegisterStudent},
    {path: config.routes.searchCourses, component: SearchCourses},
    {path: config.routes.courseDetail, component: CourseDetail},
    {path: config.routes.profile, component: Profile},
    {path: config.routes.excellentInstructor, component: ExcellentInstructor},
    {path: config.routes.practiceQuiz, component: PracticeQuiz},
    {path: config.routes.instructorDetail, component: InstructorDetail},
    {path: config.routes.googleAuth, component: AuthGoogle},
    {path: config.routes.cart, component: Cart},
    {path: config.routes.bookMark, component: BookMark},
    {path: config.routes.takeQuiz, component: TakeQuiz},
    {path: config.routes.dashboardInstructor, component: DashboardInstructor},
    {path: config.routes.myClasses, component: MyClasses},
    {path: config.routes.wallet, component: Wallet},
    {path: config.routes.dashboardAdmin, component: DashBoardAdmin},
]

const privateRoutes = [
    {path: config.routes.home, component: Home, role: ['Student, Instructor']},
    {path: config.routes.registerInstructor, component: RegisterInstructor, role: ['Student, Instructor']},
]

export { publicRoutes, privateRoutes };