import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Loader2,
    Phone,
    Lock,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { teacherAuthService } from "../service/mutate/teacherAuth";
import Cookies from "js-cookie";

export const TeacherOTPVerify = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [step, setStep] = useState<"send" | "verify">("send");
    const [timer, setTimer] = useState(119);

    const email = searchParams.get("email") || "";

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    useEffect(() => {
        let interval: any;
        if (step === "verify" && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const sendOtpMutation = useMutation({
        mutationFn: () =>
            teacherAuthService.sendOTP({ email, phoneNumber, password }),
        onSuccess: (res) => {
            toast.success(`Tasdiqlash kodi yuborildi!
                Test uchun otp: ${res.data.otp}`);
            setStep("verify");
            setTimer(119);
        },
        onError: (err: any) =>
            toast.error(err?.response?.data?.message || "Xatolik yuz berdi"),
    });

    const verifyOtpMutation = useMutation({
        mutationFn: () => teacherAuthService.verifyOTP({ email, otp }),
        onSuccess: (res) => {
            Cookies.set("frontToken", res.accessToken);
            Cookies.set("role", res.role);
            toast.success("Hisob muvaffaqiyatli faollashtirildi!", {
                position: "top-right",
            });
            setTimeout(() => navigate("/teacher/profile"), 1500);
        },
        onError: (err: any) =>
            toast.error(err?.response?.data?.message || "Kod noto'g'ri", {
                position: "top-right",
            }),
    });

    const isLoading = sendOtpMutation.isPending || verifyOtpMutation.isPending;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f7ff] p-4 font-sans">
            <Card className="w-full max-w-112.5 shadow-2xl border-none rounded-3xl p-2">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
                            {step === "send" ? (
                                <Phone className="w-7 h-7 text-blue-600" />
                            ) : (
                                <ShieldCheck className="w-7 h-7 text-green-600" />
                            )}
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-extrabold text-slate-800">
                        {step === "send"
                            ? "Complete Registration"
                            : "Verify Your Phone"}
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        {step === "send"
                            ? "Step 2 of 3: Add your phone number and create a password"
                            : `Step 3 of 3: Enter the 6-digit code sent to ${phoneNumber}`}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between px-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        <span className="text-blue-600">Google</span>
                        <span
                            className={
                                step === "send"
                                    ? "text-blue-600"
                                    : "text-green-600"
                            }
                        >
                            Phone & Password
                        </span>
                        <span
                            className={
                                step === "verify" ? "text-green-600" : ""
                            }
                        >
                            Verification
                        </span>
                    </div>
                    <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`absolute h-full transition-all duration-500 ${
                                step === "send"
                                    ? "w-[66%] bg-blue-600"
                                    : "w-full bg-green-500"
                            }`}
                        />
                    </div>
                    Sahifa topilmadi Adashib qoldingizmi? Siz qidirayotgan
                    sahifa mavjud emas yoki boshqa manzilga ko'chirilgan.
                    Pastdagi tugmalar orqali davom etishingiz mumkin. ￼← Orqaga
                    qaytish
                    {step === "send" ? (
                        <div className="space-y-4 pt-2">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-slate-600 ml-1">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input
                                        className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-blue-500"
                                        placeholder="+998 90 123 45 67"
                                        value={phoneNumber}
                                        onChange={(e) =>
                                            setPhoneNumber(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-slate-600 ml-1">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="password"
                                        className="pl-10 h-12 bg-slate-50 border-slate-200"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-slate-600 ml-1">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="password"
                                        className="pl-10 h-12 bg-slate-50 border-slate-200"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={() => sendOtpMutation.mutate()}
                                className="w-full h-12 bg-slate-900 hover:bg-black text-white rounded-xl transition-all"
                                disabled={
                                    isLoading ||
                                    !phoneNumber ||
                                    password !== confirmPassword
                                }
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    "Continue to Verification"
                                )}
                                <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6 pt-2 text-center">
                            <div className="flex justify-between gap-2">
                                {[...Array(6)].map((_, i) => (
                                    <Input
                                        key={i}
                                        maxLength={1}
                                        className="h-14 w-full text-center text-xl font-bold border-2 focus:border-green-500"
                                        value={otp[i] || ""}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val.length <= 1)
                                                setOtp((prev) => prev + val);
                                        }}
                                    />
                                ))}
                            </div>

                            <p className="text-sm text-slate-500">
                                Code expires in{" "}
                                <span className="text-red-500 font-medium">
                                    {formatTime(timer)}
                                </span>
                            </p>

                            <Button
                                onClick={() => verifyOtpMutation.mutate()}
                                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg shadow-green-100"
                                disabled={isLoading || otp.length < 6}
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    "Complete Registration"
                                )}
                                <CheckCircle2 className="ml-2 w-4 h-4" />
                            </Button>

                            <div className="flex flex-col gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setStep("send");
                                        setOtp("");
                                    }}
                                    className="w-full h-12 border-slate-200 text-slate-600"
                                >
                                    <ArrowLeft className="mr-2 w-4 h-4" />{" "}
                                    Resend in {formatTime(timer)}
                                </Button>
                                <p className="text-xs text-slate-400">
                                    Didn't receive the code? Check your spam
                                    folder or{" "}
                                    <span className="text-blue-600 cursor-pointer hover:underline">
                                        try signing in
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
