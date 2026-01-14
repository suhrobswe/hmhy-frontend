import React from "react";
import { Star, ChevronRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Teacher } from "@/types";

interface TeacherCardProps {
    teacher: Teacher;
}

export const TeacherCardForLesson: React.FC<TeacherCardProps> = ({
    teacher,
}) => {
    const navigate = useNavigate();

    const handleViewLessons = () => {
        navigate(`/admin/lesson/${teacher.id}`);
    };

    return (
        <Card className="border-none shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="relative">
                        <Avatar className="w-14 h-14 rounded-full border">
                            <AvatarImage
                                src={teacher.imageUrl}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-slate-200 text-slate-700 font-medium">
                                {teacher.fullName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                                teacher.isActive
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                            }`}
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg text-slate-900 truncate">
                                    {teacher.fullName}
                                </h3>
                                <div className="flex items-center gap-1 text-slate-400 text-sm">
                                    <User className="w-3.5 h-3.5" />
                                    <span>{teacher.level || "B1"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-slate-900">
                                {teacher.rating || "0.0"}
                            </span>
                        </div>
                        <div className="text-slate-500 text-sm italic">
                            {new Intl.NumberFormat("uz-UZ").format(
                                teacher.hourPrice || 0
                            )}{" "}
                            so'm/h
                        </div>
                    </div>

                    <div className="text-slate-400 text-sm">
                        {teacher.experience || "1 Year experience"}
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={handleViewLessons}
                    className="w-full mt-6 border-slate-200 text-slate-600 font-medium hover:bg-slate-50 flex justify-between px-6 rounded-md py-5"
                >
                    <span className="flex-1 text-center">View Lessons</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
            </CardContent>
        </Card>
    );
};
