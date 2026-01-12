import React from "react";
import {
    Calendar,
    Clock,
    DollarSign,
    Video,
    CheckCircle2,
    XCircle,
    AlertCircle,
} from "lucide-react";
import { LessonStatus, type Lesson } from "@/types/admin-type";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const statusConfig = {
    [LessonStatus.COMPLETED]: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle2,
        label: "Yakunlangan",
    },
    [LessonStatus.CANCELLED]: {
        color: "bg-red-100 text-red-700 border-red-200",
        icon: XCircle,
        label: "Bekor qilingan",
    },
    [LessonStatus.BOOKED]: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: Clock,
        label: "Band qilingan",
    },
    [LessonStatus.AVAILABLE]: {
        color: "bg-slate-100 text-slate-700 border-slate-200",
        icon: AlertCircle,
        label: "Bo'sh",
    },
};

export const LessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
    const config =
        statusConfig[lesson.status as LessonStatus] ||
        statusConfig[LessonStatus.AVAILABLE];
    const Icon = config.icon;

    // API'dan kelayotgan firstName va lastName'ni to'g'ri o'qish
    const studentName = lesson.student
        ? `${lesson.student.firstName} ${lesson.student.lastName}`
        : "Talaba biriktirilmagan";


    return (
        <Card className="overflow-hidden border-l-4 border-l-primary/20 hover:border-l-primary transition-all bg-white shadow-sm">
            <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <h4 className="font-bold text-gray-900 leading-tight">
                            {lesson.name}
                        </h4>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                            Talaba:{" "}
                            <span className="text-foreground">
                                {studentName}
                            </span>
                        </p>
                    </div>
                    <Badge
                        className={`${config.color} shadow-none px-2 py-0.5 border`}
                        variant="outline"
                    >
                        <Icon className="w-3.5 h-3.5 mr-1" />
                        {config.label}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary/60" />
                        {new Date(lesson.startTime).toLocaleDateString("uz-UZ")}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary/60" />
                        {new Date(lesson.startTime).toLocaleTimeString(
                            "uz-UZ",
                            { hour: "2-digit", minute: "2-digit" }
                        )}
                    </div>
                </div>

                {lesson.googleMeetUrl ? (
                    <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none transition-colors"
                    >
                        <a
                            href={lesson.googleMeetUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Video className="w-4 h-4 mr-2" /> Google Meet-ga
                            qo'shilish
                        </a>
                    </Button>
                ) : (
                    <div className="h-9" /> // Joyni ushlab turish uchun
                )}
            </CardContent>

            <Separator />

            <CardFooter className="p-4 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center font-bold text-primary text-lg">
                    <DollarSign className="w-4 h-4" />
                    {/* Price string bo'lib kelishi mumkin, Number() orqali o'giramiz */}
                    {new Intl.NumberFormat("uz-UZ").format(
                        Number(lesson.price)
                    )}
                </div>
                <Badge
                    variant={lesson.isPaid ? "default" : "outline"}
                    className={
                        lesson.isPaid
                            ? "bg-green-600 hover:bg-green-700"
                            : "text-amber-600 border-amber-200 bg-amber-50"
                    }
                >
                    {lesson.isPaid ? "To'langan" : "To'lanmagan"}
                </Badge>
            </CardFooter>
        </Card>
    );
};
