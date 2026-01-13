import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { BASE_URL, request } from "@/config/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Cookies from "js-cookie";

// Validatsiya sxemasi
const formSchema = z.object({
    email: z
        .string()
        .min(1, "Email kiritish majburiy")
        .email("Noto'g'ri email formati"),
    password: z
        .string()
        .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
});

export const TeacherLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const res = await request.post("/signin/teacher", values);
            const token = res.data.data.accessToken;
            const isActive = res.data.data.isActive;
            const role: string = res.data.data.role;

            Cookies.set("token2", token);
            Cookies.set("role", role.toLowerCase());
            Cookies.set("isActive", isActive);
            Cookies.set("fullName", res.data.data.fullName);

            toast.success("Muvaffaqiyatli tizimga kirdingiz!", {
                position: "top-right",
            });

            isActive
                ? navigate("/teacher/dashboard")
                : navigate("/teacher/profile");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Login amalga oshmadi");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${BASE_URL}/teacher/google`;
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f4f9] p-4">
            <Card className="w-full max-w-110 shadow-xl border-none">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                        Teacher Login
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-sm">
                        Welcome back! Please sign in to your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Google Login Button */}
                    <Button
                        variant="outline"
                        type="button"
                        disabled={loading}
                        onClick={handleGoogleLogin}
                        className="w-full h-12 border-slate-200 hover:bg-slate-50 transition-colors gap-3"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="h-5 w-5"
                        />
                        <span className="text-slate-700 font-medium">
                            Continue with Google
                        </span>
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-slate-400">
                                or
                            </span>
                        </div>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="teacher@example.com"
                                                className="bg-slate-50 h-11 border-slate-200 focus-visible:ring-slate-400"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="••••••••"
                                                    className="bg-slate-50 h-11 border-slate-200 focus-visible:ring-slate-400 pr-10"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent text-slate-400 hover:text-slate-600"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff size={18} />
                                                    ) : (
                                                        <Eye size={18} />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full h-12 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold transition-all rounded-md mt-2"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <div className="text-sm text-center text-slate-600">
                        Don't have an account?{" "}
                        <Button
                            variant="link"
                            className="p-0 h-auto font-semibold text-blue-600"
                            type="button"
                            onClick={handleGoogleLogin}
                        >
                            Register with Google
                        </Button>
                    </div>
                    <p className="text-[11px] text-center text-slate-400 leading-normal px-8">
                        By signing in, you agree to our{" "}
                        <a href="#" className="underline hover:text-slate-600">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-slate-600">
                            Privacy Policy
                        </a>
                    </p>
                </CardFooter>
            </Card>

            <div className="mt-8">
                <Button
                    variant="ghost"
                    className="text-slate-500 text-sm hover:bg-slate-100"
                >
                    Need help?{" "}
                    <span className="text-blue-600 ml-1">Contact Support</span>
                </Button>
            </div>
        </div>
    );
};
