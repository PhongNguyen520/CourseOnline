const routes = {
    home: '/',
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
}

export default routes;