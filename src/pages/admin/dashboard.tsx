import {
    Users,
    GraduationCap,
    BookOpen,
    DollarSign,
    CheckCircle,
    XCircle,
    Star,
    TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { tezkorHarakatlar } from "@/router/admin";
import Cookies from "js-cookie";
import { useDashboardStats } from "./service/query/admin/useDashboardStats";

export const DashboardPage = () => {
    const { data, isLoading, isError } = useDashboardStats();
    const username = Cookies.get("username");

    if (isLoading) {
        return (
            <div className="p-6 min-h-screen">
                <div className="w-full">
                    <div className="mb-8">
                        <Skeleton className="h-9 w-80 mb-2" />
                        <Skeleton className="h-5 w-64" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="border-2">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Skeleton className="w-14 h-14 rounded-lg" />
                                        <Skeleton className="w-5 h-5" />
                                    </div>
                                    <Skeleton className="h-4 w-20 mb-1" />
                                    <Skeleton className="h-9 w-16 mb-1" />
                                    <Skeleton className="h-4 w-24" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="border-2">
                                <CardHeader>
                                    <Skeleton className="h-6 w-32" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="w-6 h-6 rounded-full" />
                                                <Skeleton className="h-5 w-20" />
                                            </div>
                                            <Skeleton className="h-8 w-12" />
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="w-6 h-6 rounded-full" />
                                                <Skeleton className="h-5 w-24" />
                                            </div>
                                            <Skeleton className="h-8 w-12" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-2">
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-4 border-2 rounded-lg"
                                    >
                                        <Skeleton className="w-12 h-12 rounded-lg" />
                                        <Skeleton className="h-5 w-24" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <Card className="max-w-md shadow-lg">
                    <CardContent className="pt-6 text-center">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Ma'lumotlarni yuklashda xatolik
                        </h3>
                        <p className="text-gray-600">
                            Iltimos, qaytadan urinib ko'ring
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const stats = data.data;

    const statsCards = [
        {
            title: "Ustozlar",
            value: stats.totalTeachers,
            subtitle: `${stats.totalTeachers} faol`,
            icon: Users,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
        },
        {
            title: "Talabalar",
            value: stats.totalStudents,
            subtitle: `${stats.totalStudents} faol`,
            icon: GraduationCap,
            iconColor: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
        },
        {
            title: "Darslar",
            value: stats.totalLessons,
            subtitle: "Jami darslar",
            icon: BookOpen,
            iconColor: "text-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
        },
        {
            title: "Daromad",
            value: stats.totalRevenue.toLocaleString("uz-UZ"),
            subtitle: "Jami daromad (so'm)",
            icon: DollarSign,
            iconColor: "text-yellow-600",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
        },
    ];

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-9xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Xush kelibsiz, {username?.toUpperCase()}! 👋
                    </h1>
                    <p className="text-gray-600">
                        Bugungi platformangiz statistikasi
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsCards.map((stat, index) => (
                        <Card
                            key={index}
                            className={`border-2 ${stat.borderColor} hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className={`w-14 h-14 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                                    >
                                        <stat.icon
                                            className={`w-7 h-7 ${stat.iconColor}`}
                                        />
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600 mb-1">
                                    {stat.title}
                                </h3>
                                <p className="text-3xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {stat.subtitle}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="border-2 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <GraduationCap className="w-5 h-5 text-green-600" />
                                Talabalar
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <span className="font-medium text-gray-700">
                                        Faol
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">
                                    {stats.totalStudents}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <XCircle className="w-6 h-6 text-gray-600" />
                                    <span className="font-medium text-gray-700">
                                        Bloklangan
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">
                                    0
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Users className="w-5 h-5 text-blue-600" />
                                Ustozlar
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <Users className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-gray-700">
                                        Jami
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">
                                    {stats.totalTeachers}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div className="flex items-center gap-3">
                                    <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
                                    <span className="font-medium text-gray-700">
                                        O'rtacha reyting
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">
                                    4.5
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                                Darslar & Daromad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-6 h-6 text-purple-600" />
                                    <span className="font-medium text-gray-700">
                                        Jami darslar
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">
                                    {stats.totalLessons}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                    <span className="font-medium text-gray-700">
                                        Daromad
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">
                                    {(stats.totalRevenue / 1000).toFixed(1)}K
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-2 hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Tezkor harakatlar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {tezkorHarakatlar.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.link}
                                    className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
                                >
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <item.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
