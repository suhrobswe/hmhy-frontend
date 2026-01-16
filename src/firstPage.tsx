import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const FirstPage = () => {
    const navigate = useNavigate();

    const roles = [
        {
            title: "Student",
            description: "Learn, take exams and track your progress",
            icon: <GraduationCap className="w-10 h-10 text-blue-600" />,
            path: "/student",
            buttonText: "Student Panel",
            color: "hover:border-blue-500",
        },
        {
            title: "Teacher",
            description: "Manage classes, create tests and grade students",
            icon: <BookOpen className="w-10 h-10 text-purple-600" />,
            path: "/login/teacher",
            buttonText: "Teacher Login",
            color: "hover:border-purple-500",
        },
        {
            title: "Administrator",
            description: "Full control over the system and users",
            icon: <ShieldCheck className="w-10 h-10 text-slate-800" />,
            path: "/login/admin",
            buttonText: "Admin Login",
            color: "hover:border-slate-800",
        },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc] p-6">
            <div className="text-center mb-12 space-y-3">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    HMHY Platform
                </h1>
                <p className="text-lg text-slate-500 max-w-lg mx-auto">
                    Select your portal to continue. Access your personalized
                    dashboard and tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {roles.map((role, index) => (
                    <Card
                        key={index}
                        className={`group transition-all duration-300 border-2 border-transparent shadow-sm ${role.color} cursor-default`}
                    >
                        <CardHeader className="flex flex-col items-center text-center space-y-4 pt-8">
                            <div className="p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                {role.icon}
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-bold">
                                    {role.title}
                                </CardTitle>
                                <CardDescription className="px-4">
                                    {role.description}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-8 px-8">
                            <Button
                                onClick={() => navigate(role.path)}
                                className="w-full h-12 text-md font-semibold bg-slate-900 hover:bg-slate-800 transition-all shadow-md"
                            >
                                {role.buttonText}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-16 text-slate-400 text-sm italic">
                © HMHY Education Systems. All rights reserved.
            </div>
        </div>
    );
};
