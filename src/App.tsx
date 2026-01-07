import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import { MainLayout } from "./layout/main";
import { AdminLogin } from "./pages/auth/adminLogin";
import { DashboardPage } from "./pages/admin/dashboard";
import { ProfilePage } from "./pages/admin/profile";

function App() {
    return (
        <Routes>
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/" element={<MainLayout />}>
                <Route path="admin/dashboard" element={<DashboardPage />} />
                <Route path="admin/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
