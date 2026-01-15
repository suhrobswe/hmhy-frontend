import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import { MainLayout } from "./layout/main";
import { AdminLogin } from "./pages/auth/adminLogin";
import { adminRoute } from "./router/admin";
import { TeacherLogin } from "./pages/auth/teacher/teacherLogin";
import { teacherRoute } from "./router/teacher";
import { HomePage } from "./Home";
import { TeacherOTPVerify } from "./pages/auth/teacher/teacherVerify";
import { StudentLogin } from "./pages/student/home";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<HomePage />} />

            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/teacher" element={<TeacherLogin />} />
            <Route path="/teacher/register" element={<TeacherOTPVerify />} />
            <Route path="/student" element={<StudentLogin />} />

            <Route path="/" element={<MainLayout />}>
                {adminRoute.map(({ path, page: Page }) => (
                    <Route key={path} path={path} element={<Page />} />
                ))}
                {teacherRoute.map(({ path, page: Page }) => (
                    <Route key={path} path={path} element={<Page />} />
                ))}

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
