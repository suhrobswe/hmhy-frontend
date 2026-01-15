import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFoundPage";
import { MainLayout } from "./layout/main";
import { AdminLogin } from "./pages/auth/adminLogin";
import { adminRoute } from "./router/admin";
import { TeacherLogin } from "./pages/auth/teacher/teacherLogin";
import { teacherRoute } from "./router/teacher";
import { FirstPage } from "./firstPage";
import { TeacherOTPVerify } from "./pages/auth/teacher/teacherVerify";
import { StudentLogin } from "./pages/student/home";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<FirstPage />} />

            <Route path="/" element={<StudentLogin />} />

            <Route path="/login/admin" element={<AdminLogin />} />

            <Route path="/login/teacher" element={<TeacherLogin />} />
            <Route path="/teacher/register" element={<TeacherOTPVerify />} />

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
