import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useAdminLogin } from "./service/mutate/useAdminLogin";
import type { AdminLoginInput, LoginResponse } from "@/types/auth-type";
import { PasswordInput } from "@/components/ui/password-input";
import { useNavigate } from "react-router-dom";

// Form schema
const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
});

export const AdminLogin = () => {
    const { mutate, isPending } = useAdminLogin();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutate(data as AdminLoginInput, {
            onSuccess: (res: LoginResponse) => {
                const rawRole = res.data.data.role.toLowerCase();

                const role = rawRole === "superadmin" ? "superadmin" : "admin";

                Cookies.set("token2", res.data.data.accessToken);
                Cookies.set("role", role);

                console.log("Token:", res.data.data.accessToken);
                console.log("Role:", role);

                toast.success("Tizimga muvaffaqiyatli kirildi!", {
                    position: "top-right",
                });

                navigate(`/${role}/dashboard`, { replace: true });
            },
            onError: (error: any) => {
                console.error("Login error:", error);
                toast.error("Login failed. Please check your credentials.");
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4">
            <div className="w-full max-w-110 mx-auto">
                {/* Form Card */}
                <div className="bg-white rounded-4xl px-10 py-12 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
                            Admin Panel
                        </h1>
                        <p className="text-gray-500 text-[13px] mt-1.5">
                            Tizim boshqaruvi uchun kirish
                        </p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Username input */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 text-[13px] font-medium">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="superadmin"
                                                className="bg-[#f5f6f7] border-transparent text-gray-900 h-12 rounded-lg focus:bg-white focus:border-gray-300 transition-colors"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password input */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 text-[13px] font-medium">
                                            Parol
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="••••••••"
                                                className="bg-[#f5f6f7] border-transparent text-gray-900 h-12 rounded-lg focus:bg-white focus:border-gray-300 transition-colors"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-[#1a1a1a] hover:bg-black text-white h-12 rounded-lg mt-8 font-medium text-[15px] transition-colors"
                            >
                                {isPending && (
                                    <Spinner className="w-4 h-4 mr-2" />
                                )}
                                {isPending
                                    ? "Yuklanmoqda..."
                                    : "Tizimga kirish"}
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center text-[11px] text-gray-400 mt-8 leading-relaxed">
                        Admin panel - Faqat ruxsat etilgan foydalanuvchilar
                        uchun
                    </p>
                </div>
            </div>
        </div>
    );
};
