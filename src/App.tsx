import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./NotFoundPage";
import { MainLayout } from "./layout/main";
import { AdminLogin } from "./pages/auth/adminLogin";
import { adminRoute } from "./router/admin";
import { TeacherLogin } from "./pages/auth/teacher/teacherLogin";
import { teacherRoute } from "./router/teacher";
import { FirstPage } from "./firstPage";
import { TeacherOTPVerify } from "./pages/auth/teacher/teacherVerify";
import { StudentLogin } from "./pages/student/home";
import { studentRoute } from "./router/student ";
import { useAuth } from "./pages/student/service/mutate/useAuth";
import Cookies from "js-cookie";

function App() {
    const { mutate: telegramLogin, isPending } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready();
            tg.expand();

            const token = Cookies.get("frontToken");

            if (token) {
                if (window.location.pathname === "/") {
                    navigate("/student/profile", { replace: true });
                }
            } else if (tg.initData) {
                telegramLogin(tg.initData);
            }
        }
    }, []);

    if (isPending) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium text-center px-4">
                        Checking authorization... <br />
                        (Check vConsole for logs)
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/student" element={<StudentLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/teacher" element={<TeacherLogin />} />
            <Route path="/teacher/register" element={<TeacherOTPVerify />} />

            <Route element={<MainLayout />}>
                {adminRoute.map(({ path, page: Page }) => (
                    <Route key={path} path={path} element={<Page />} />
                ))}

                {studentRoute.map(({ path, page: Page }) => (
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
