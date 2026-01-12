import { TeacherCardForLesson } from "./components/teacher/teacherCardForLesson";
import type { Teacher } from "@/types/admin-type";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useTeacherList } from "./service/query/teacher/useTeacherList";
import { useState } from "react";

export const LessonsPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useTeacherList(page);

    const teachers = data?.data ?? [];
    const pagination = data;

    return (
        <div className="min-h-screen p-8 space-y-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <span>Admin Panel</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        Lessons Management
                    </h1>
                    <p className="text-slate-500 text-sm">
                        View and manage all teacher lessons
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="h-64 bg-white animate-pulse rounded-xl"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teachers.map((teacher: Teacher) => (
                            <TeacherCardForLesson
                                key={teacher.id}
                                teacher={teacher}
                            />
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between pt-8 border-t border-slate-200">
                    <div className="text-sm text-slate-500">
                        Showing{" "}
                        <span className="font-semibold text-slate-900">
                            {(page - 1) * 10 + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-slate-900">
                            {Math.min(
                                page * 10,
                                pagination?.totalElements || 0
                            )}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-slate-900">
                            {pagination?.totalElements}
                        </span>{" "}
                        results
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                        <Pagination className="w-auto mx-0">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (page > 1) setPage(page - 1);
                                        }}
                                        className={`bg-white border-slate-200 cursor-pointer ${
                                            page === 1
                                                ? "opacity-50 pointer-events-none"
                                                : ""
                                        }`}
                                    />
                                </PaginationItem>

                                {/* Sahifalar raqami (ixtiyoriy, chiroyli ko'rinishi uchun) */}
                                {[...Array(pagination.totalPages)].map(
                                    (_, i) => {
                                        const pageNum = i + 1;
                                        // Faqat joriy sahifa atrofidagilarni ko'rsatish
                                        if (
                                            pageNum === 1 ||
                                            pageNum === pagination.totalPages ||
                                            (pageNum >= page - 1 &&
                                                pageNum <= page + 1)
                                        ) {
                                            return (
                                                <PaginationItem key={pageNum}>
                                                    <PaginationLink
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setPage(pageNum);
                                                        }}
                                                        isActive={
                                                            page === pageNum
                                                        }
                                                        className="cursor-pointer"
                                                    >
                                                        {pageNum}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        }
                                        if (
                                            pageNum === page - 2 ||
                                            pageNum === page + 2
                                        ) {
                                            return (
                                                <PaginationEllipsis
                                                    key={pageNum}
                                                />
                                            );
                                        }
                                        return null;
                                    }
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (page < pagination.totalPages)
                                                setPage(page + 1);
                                        }}
                                        className={`bg-white border-slate-200 cursor-pointer ${
                                            page === pagination.totalPages
                                                ? "opacity-50 pointer-events-none"
                                                : ""
                                        }`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </div>
        </div>
    );
};
