import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Send, ShieldCheck } from "lucide-react";

export const StudentLogin = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f2f9] p-4">
            <Card className="w-full max-w-112.5 border-none shadow-sm rounded-4xl p-6 py-12">
                <CardHeader className="flex flex-col items-center pb-2">
                    <div className="flex items-center mb-6">
                        <span className="text-5xl font-black tracking-tighter text-black">
                            HM
                        </span>
                        <span className="text-5xl font-black tracking-tighter text-[#00bfae]">
                            HY
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-[#1a1a1a] mb-1">
                        Help me help you
                    </h1>
                    <p className="text-gray-500 font-medium">Xush kelibsiz!</p>
                </CardHeader>

                <CardContent className="flex flex-col items-center text-center space-y-6">
                    <p className="text-gray-500 text-[15px] leading-relaxed max-w-[320px]">
                        Platformamizdan foydalanish uchun Telegram botimizga
                        o'ting
                    </p>

                    <Button
                        asChild
                        className="w-full h-12.5 rounded-lg bg-linear-to-r from-[#3b82f6] to-[#00bfae] hover:opacity-90 transition-opacity text-white font-semibold text-base gap-3 shadow-md"
                    >
                        <a
                            href="https://t.me/HMHY_bot"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Send className="w-4 h-4 fill-white" />
                            Telegram Bot'ga o'tish
                        </a>
                    </Button>

                    <p className="text-gray-400 text-[13px] leading-snug max-w-75">
                        Bot orqali darslarni ko'rishingiz, band qilishingiz va
                        boshqarishingiz mumkin
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col items-center pt-8 border-t border-gray-100 mt-4">
                    <a
                        href="#"
                        className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Maxfiylik Siyosati
                    </a>
                </CardFooter>
            </Card>

            <p className="mt-6 text-gray-400 text-sm">Privacy Policy</p>
        </div>
    );
};
