const routes = {
    home: '/home',
    registerInstructor: '/register/instructor',
    registerStudent: '/register/student',
    searchCourses: '/searchCourses',
    courseDetail: '/courseDetail/:courseId',
    profile: '/profile',
    excellentInstructor: '/excellentInstructor',
    practiceQuiz: '/quizzes/practice',
    resultQuiz: '/quizzes/result',
    instructorDetail: '/excellentInstructor/:instructorId',
    googleAuth: '/googleAuth',
    cart: '/cart',
    courses: '/courses',
    lessons: '/lessons/:courseId',
    quiz: '/quiz/:courseId/:lessonId',
    quizResult: '/quizResult/:courseId/:lessonId',
    quizQuestion: '/quizQuestion/:courseId/:lessonId/:questionId',
    bookMark: '/bookmarks',
    takeQuiz: '/takeQuiz/:quizid',
    dashboardInstructor: '/instructor/dashboard',
    profileInstructor: '/instructor/profile',
    myClasses: '/myClass',
    wallet: '/wallet',
    dashboardAdmin: '/admin/dashboard',
    unauthorized: '/unauthorized',
    lectures: '/lectures',
    instructorLectures: '/instructor/lectures',
    instructorCourses: '/instructor/courses',
    instructorWallet: '/instructor/wallet',
    instructorFeedback: '/instructor/feedback',
}

export default routes;