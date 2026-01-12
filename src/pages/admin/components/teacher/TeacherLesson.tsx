import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Video,
} from "lucide-react";
import { LessonStatus, type Lesson } from "@/types/admin-type";
import { useTeacher } from "../../service/query/teacher/useTeacher";
import { useTeacherLessons } from "../../service/query/teacher/useTeacherLesson";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const TeacherLessonsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    if (!id) return null;

    const { data: teacherData } = useTeacher(id);

    const { data, isLoading: lessonsLoading } = useTeacherLessons(id, {
        page: page,
        limit: 10,
    });

    const teacher = teacherData?.data;
    const lessons = teacher?.lessons || [];
    const totalPages = teacherData?.totalPages || 1;

    const getStatusBadge = (status: LessonStatus) => {
        const variants: Record<string, string> = {
            [LessonStatus.COMPLETED]:
                "bg-emerald-50 text-emerald-600 border-emerald-100",
            [LessonStatus.BOOKED]:
                "bg-amber-50 text-amber-600 border-amber-100",
            [LessonStatus.CANCELLED]: "bg-red-50 text-red-600 border-red-100",
            [LessonStatus.AVAILABLE]:
                "bg-slate-50 text-slate-600 border-slate-100",
        };
        return variants[status] || variants[LessonStatus.AVAILABLE];
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="bg-white shadow-sm border-slate-200 text-slate-600"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Teachers
                </Button>

                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900">
                        {teacher?.fullName} - Lessons
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Manage and view all lessons for this teacher
                    </p>
                </div>

                <Card className="border-none shadow-sm overflow-hidden bg-white">
                    <CardHeader className="border-b bg-white py-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-base font-semibold">
                                Lessons
                            </CardTitle>
                            <span className="text-xs text-slate-400 font-normal">
                                {lessons.length} total lessons
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {lessonsLoading ? (
                            <div className="p-6 space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        ) : lessons.length > 0 ? (
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="hover:bg-transparent border-slate-100">
                                        <TableHead className="text-slate-900 font-bold py-4">
                                            Date & Time
                                        </TableHead>
                                        <TableHead className="text-slate-900 font-bold">
                                            Student
                                        </TableHead>
                                        <TableHead className="text-slate-900 font-bold text-center">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-slate-900 font-bold text-right">
                                            Price
                                        </TableHead>
                                        <TableHead className="text-slate-900 font-bold text-center">
                                            Payment
                                        </TableHead>
                                        <TableHead className="text-slate-900 font-bold text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lessons.map((lesson: Lesson) => (
                                        <TableRow
                                            key={lesson.id}
                                            className="border-slate-50"
                                        >
                                            <TableCell className="py-4">
                                                <div className="text-sm font-medium text-slate-900">
                                                    {new Date(
                                                        lesson.startTime
                                                    ).toLocaleDateString(
                                                        "en-GB"
                                                    )}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {new Date(
                                                        lesson.startTime
                                                    ).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm font-medium text-slate-900">
                                                    {lesson.student
                                                        ? `${lesson.student.firstName} ${lesson.student.lastName}` // firstName va lastName (Katta harfda)
                                                        : "N/A"}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    className={`${getStatusBadge(
                                                        lesson.status
                                                    )} shadow-none font-medium border`}
                                                >
                                                    {lesson.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-medium text-slate-900">
                                                {new Intl.NumberFormat(
                                                    "uz-UZ"
                                                ).format(
                                                    Number(lesson.price)
                                                )}{" "}
                                                UZS
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant={
                                                        lesson.isPaid
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className={
                                                        lesson.isPaid
                                                            ? "bg-emerald-500 hover:bg-emerald-500"
                                                            : "bg-slate-100 text-slate-500"
                                                    }
                                                >
                                                    {lesson.isPaid
                                                        ? "Paid"
                                                        : "Unpaid"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {lesson.googleMeetUrl && (
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-8 w-8 text-blue-500 hover:bg-blue-50"
                                                            asChild
                                                        >
                                                            <a
                                                                href={
                                                                    lesson.googleMeetUrl
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <Video className="w-4 h-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-slate-400"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-20 bg-white">
                                <Calendar className="w-12 h-12 mx-auto text-slate-200 mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900">
                                    No lessons found
                                </h3>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-xs text-slate-500">
                        Showing{" "}
                        <span className="font-semibold text-slate-900">
                            {lessons.length}
                        </span>{" "}
                        results
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="px-4">
                            {page}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
