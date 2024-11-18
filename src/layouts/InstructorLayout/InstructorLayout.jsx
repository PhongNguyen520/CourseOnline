import Header from '../InstructorLayout/Header/Header';

function InstructorLayout({ children }) {
    return (
        <>
                <Header />
                {children}
        </>
    );
}

export default InstructorLayout;
