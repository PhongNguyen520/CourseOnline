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
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import config from '../config';
import Lectures from "../pages/Lectures/Lectures";
import ProfileInstructor from "../pages/ProfileInstructor/ProfileInstructor";
import InstructorLayout from "../layouts/InstructorLayout/InstructorLayout";
import CourseInstructor from "../pages/CourseInstructor/CourseInstructor";
import LecturesInstructor from "../pages/LecturesInstructor/LecturesInstructor";
import FeedbackInstructor from "../pages/FeedbackInstructor/FeedbackInstructor";
import WalletInstructor from "../pages/WalletInstructor/WalletInstructor";

export const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.registerInstructor, component: RegisterInstructor, layout: DefaultLayout },
  { path: config.routes.registerStudent, component: RegisterStudent, layout: DefaultLayout },
  { path: config.routes.googleAuth, component: AuthGoogle, layout: null },
  { path: config.routes.unauthorized, component: Unauthorized, layout:  null },
  { path: config.routes.lectures, component: Lectures },
];

export const studentRoutes = [
  { path: config.routes.searchCourses, component: SearchCourses },
  { path: config.routes.courseDetail, component: CourseDetail },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.excellentInstructor, component: ExcellentInstructor },
  { path: config.routes.practiceQuiz, component: PracticeQuiz },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.bookMark, component: BookMark },
  { path: config.routes.takeQuiz, component: TakeQuiz },
  { path: config.routes.myClasses, component: MyClasses },
  { path: config.routes.wallet, component: Wallet },
  { path: config.routes.instructorDetail, component: InstructorDetail },
  { path: config.routes.unauthorized, component: Unauthorized, layout:  null },
  { path: config.routes.lectures, component: Lectures },
];

export const instructorRoutes = [
  { path: config.routes.profileInstructor, component: ProfileInstructor, layout: null },
  { path: config.routes.courseDetail, component: CourseDetail },
  { path: config.routes.dashboardInstructor, component: DashboardInstructor, layout: InstructorLayout },
  { path: config.routes.unauthorized, component: Unauthorized, layout:  null },
  { path: config.routes.instructorCourses, component: CourseInstructor, layout:  InstructorLayout },
  { path: config.routes.instructorLectures, component: LecturesInstructor, layout:  InstructorLayout },
  { path: config.routes.instructorFeedback, component: FeedbackInstructor, layout:  InstructorLayout },
  { path: config.routes.instructorWallet, component: WalletInstructor, layout:  InstructorLayout },
];

export const adminRoutes = [
  { path: config.routes.dashboardAdmin, component: DashBoardAdmin, layout: null },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.unauthorized, component: Unauthorized, layout:  null },
];
