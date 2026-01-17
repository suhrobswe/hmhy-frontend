import { useProfile } from "./service/query/useProfile";
import {
    User,
    Phone,
    Hash,
    CheckCircle2,
    Calendar,
    ShieldCheck,
    LogOut,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfilePage = () => {
    const { data: profile, isLoading } = useProfile();

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    const userData = profile?.data?.data || profile?.data || {};

    return (
        <div className="min-h-screen bg-slate-50/50 pb-24">
            {/* Top Gradient Header */}
            <div className="h-40 w-full bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500" />

            <div className="px-4 -mt-16">
                {/* Profile Main Card */}
                <Card className="border-none shadow-xl shadow-slate-200/60 overflow-hidden bg-white/80 backdrop-blur-md">
                    <CardContent className="pt-0">
                        <div className="flex flex-col items-center">
                            <Avatar className="h-28 w-28 border-4 border-white shadow-lg -mt-14 rounded-3xl">
                                <AvatarImage
                                    src={userData.photo_url}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-slate-100 text-slate-400">
                                    <User size={40} />
                                </AvatarFallback>
                            </Avatar>

                            <div className="mt-4 text-center">
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                                    {userData.firstName} {userData.lastName}
                                </h1>
                                <p className="text-sm font-medium text-muted-foreground mt-1">
                                    HMHY Platformasi Talabasi
                                </p>
                            </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex flex-col items-center justify-center">
                                <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
                                    <Calendar size={14} strokeWidth={2.5} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                        Kelayotgan
                                    </span>
                                </div>
                                <span className="text-xl font-extrabold text-slate-800">
                                    0
                                </span>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex flex-col items-center justify-center">
                                <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                                    <CheckCircle2 size={14} strokeWidth={2.5} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                        O'tgan
                                    </span>
                                </div>
                                <span className="text-xl font-extrabold text-slate-800">
                                    0
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Section */}
                <div className="mt-6 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 px-1 uppercase tracking-widest">
                        Ma'lumotlar
                    </h3>

                    <Card className="border-none shadow-md shadow-slate-200/40">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-4 p-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                    <Hash size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-medium text-slate-400 uppercase">
                                        Telegram ID
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        {userData.tgId || "Mavjud emas"}
                                    </p>
                                </div>
                            </div>

                            <div className="h-1px bg-slate-50 mx-4" />

                            <div className="flex items-center gap-4 p-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                    <Phone size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-medium text-slate-400 uppercase">
                                        Telefon raqam
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">
                                        +{userData.phoneNumber || "998..."}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Card */}
                    <Card className="border-none shadow-md shadow-slate-200/40 bg-white">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">
                                        Hisob holati
                                    </p>
                                    <p className="text-[11px] text-slate-400 font-medium">
                                        Faol foydalanuvchi
                                    </p>
                                </div>
                            </div>
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none px-3 py-1 rounded-lg">
                                Aktiv
                            </Badge>
                        </CardContent>
                    </Card>

                    {/* Logout Button */}
                    <button className="w-full mt-4 flex items-center justify-center gap-2 p-4 text-red-500 font-bold text-sm bg-red-50/50 rounded-2xl border border-red-100 active:scale-95 transition-transform">
                        <LogOut size={18} />
                        Tizimdan chiqish
                    </button>
                </div>
            </div>
        </div>
    );
};

// Yuklanish holati uchun chiroyli Skeleton
const ProfileSkeleton = () => (
    <div className="min-h-screen bg-slate-50 px-4 pt-40">
        <Card className="border-none shadow-xl">
            <CardContent className="flex flex-col items-center pb-8">
                <Skeleton className="h-28 w-28 rounded-3xl -mt-14" />
                <Skeleton className="h-6 w-40 mt-4" />
                <Skeleton className="h-4 w-24 mt-2" />
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <Skeleton className="h-20 rounded-2xl" />
                    <Skeleton className="h-20 rounded-2xl" />
                </div>
            </CardContent>
        </Card>
        <div className="mt-6 space-y-4">
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
        </div>
    </div>
);
