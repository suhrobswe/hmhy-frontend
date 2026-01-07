import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import { MainLayout } from "./layout/main";
import { AdminLogin } from "./pages/auth/adminLogin";
import { adminRoute } from "./router/admin";

function App() {
    return (
        <Routes>
            <Route path="/login/admin" element={<AdminLogin />} />

            <Route path="/" element={<MainLayout />}>
                {adminRoute.map(({ path, page: Page }) => (
                    <Route key={path} path={path} element={<Page />} />
                ))}

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
