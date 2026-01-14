import React from "react";
import {
    Calendar,
    Clock,
    Video,
    CheckCircle2,
    XCircle,
    AlertCircle,
    User,
    Wallet,
    ArrowRight,
} from "lucide-react";
import { LessonStatus, type Lesson } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusConfig = {
    [LessonStatus.COMPLETED]: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        icon: CheckCircle2,
        label: "Yakunlangan",
    },
    [LessonStatus.CANCELLED]: {
        color: "bg-rose-50 text-rose-700 border-rose-100",
        icon: XCircle,
        label: "Bekor qilingan",
    },
    [LessonStatus.BOOKED]: {
        color: "bg-blue-50 text-blue-700 border-blue-100",
        icon: Clock,
        label: "Band qilingan",
    },
    [LessonStatus.AVAILABLE]: {
        color: "bg-slate-50 text-slate-600 border-slate-200",
        icon: AlertCircle,
        label: "Bo'sh",
    },
};

export const LessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
    const config =
        statusConfig[lesson.status as LessonStatus] ||
        statusConfig[LessonStatus.AVAILABLE];
    const Icon = config.icon;

    const studentName = lesson.student
        ? `${lesson.student.firstName} ${lesson.student.lastName}`
        : "Biriktirilmagan";

    const formatPrice = (price: number | string) => {
        return new Intl.NumberFormat("uz-UZ").format(Number(price)) + " so'm";
    };

    const lessonDate = new Date(lesson.startTime);

    return (
        <Card className="group overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 bg-white rounded-2xl">
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-5">
                    <Badge
                        className={cn(
                            "shadow-none px-2.5 py-1 border font-semibold text-[10px] uppercase tracking-wider",
                            config.color
                        )}
                    >
                        <Icon className="w-3 h-3 mr-1.5" />
                        {config.label}
                    </Badge>

                    <div
                        className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-bold",
                            lesson.isPaid
                                ? "text-emerald-600"
                                : "text-amber-500"
                        )}
                    >
                        <div
                            className={cn(
                                "w-1.5 h-1.5 rounded-full animate-pulse",
                                lesson.isPaid
                                    ? "bg-emerald-600"
                                    : "bg-amber-500"
                            )}
                        />
                        {lesson.isPaid ? "To'langan" : "To'lov kutilmoqda"}
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-extrabold text-slate-800 text-lg leading-tight group-hover:text-black transition-colors">
                        {lesson.name}
                    </h4>

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                                Talaba
                            </span>
                            <span className="text-sm font-semibold text-slate-700 truncate max-w-37.5">
                                {studentName}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-1">
                        <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-100">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-[13px] font-medium text-slate-600">
                                {lessonDate.toLocaleDateString("uz-UZ", {
                                    day: "numeric",
                                    month: "short",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-100">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-[13px] font-bold text-slate-800">
                                {lessonDate.toLocaleTimeString("uz-UZ", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    {lesson.googleMeetUrl ? (
                        <Button
                            asChild
                            className="w-full bg-slate-900 hover:bg-black text-white rounded-xl h-11 text-sm font-bold shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
                        >
                            <a
                                href={lesson.googleMeetUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Video className="w-4 h-4 mr-2" />
                                Google Meet-ga qo'shilish
                                <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
                            </a>
                        </Button>
                    ) : (
                        <div className="flex items-center justify-center h-11 rounded-xl bg-slate-50 text-slate-400 text-xs font-medium border border-dashed border-slate-200">
                            Ssilka biriktirilmagan
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100">
                        <Wallet className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Narxi
                    </span>
                </div>
                <div className="text-base font-black text-slate-900">
                    {formatPrice(lesson.price)}
                </div>
            </CardFooter>
        </Card>
    );
};
