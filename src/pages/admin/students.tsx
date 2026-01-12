import { useState } from "react";
import {
    Search,
    Eye,
    Edit,
    Ban,
    Trash2,
    Copy,
    Unlock,
    AlertTriangle,
    Users,
    UserCheck,
    UserX,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { useStudentsList } from "./service/query/student/useStudentsList";
import { useStudentStats } from "./service/query/student/useStudentStats";
import { StudentEditModal } from "./components/student/studentEdit";
import { StudentBlockModal } from "./components/student/studentBlock";
import { StudentDeleteModal } from "./components/student/studentDelete";
import { StudentDetailModal } from "./components/student/studentDetail";

export function StudentsPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [modalType, setModalType] = useState<
        "detail" | "edit" | "block" | "delete" | null
    >(null);

    const { data: studentsData, isLoading } = useStudentsList(page, pageSize);
    const { data: statsData } = useStudentStats();

    const students = Array.isArray(studentsData?.data) ? studentsData.data : [];
    const totalElements = studentsData?.totalElements || 0;
    const totalPages = studentsData?.totalPages || 0;
    const from = studentsData?.from || 0;
    const to = studentsData?.to || 0;

    const stats = statsData || {
        totalStudents: 0,
        activeStudents: 0,
        blockedStudents: 0,
    };

    const copyToClipboard = (text: string, label: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success(`${label} nusxalandi!`, { position: "top-right" });
    };

    const openModal = (type: typeof modalType, studentId: string) => {
        setSelectedStudent(studentId);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setModalType(null);
    };

    return (
        <div className="min-h-screen p-6 space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Students
                </h1>
                <p className="text-muted-foreground">
                    Talabalar ro'yxati va ruxsatnomalarni boshqarish.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Total Students"
                    value={stats.totalStudents}
                    icon={<Users className="w-5 h-5" />}
                />
                <StatCard
                    label="Active Students"
                    value={stats.activeStudents}
                    icon={<UserCheck className="w-5 h-5" />}
                    variant="active"
                />
                <StatCard
                    label="Blocked Students"
                    value={stats.blockedStudents}
                    icon={<UserX className="w-5 h-5" />}
                    variant="blocked"
                />
            </div>

            <Card className="border-none shadow-sm">
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Ism, telefon yoki telegram orqali qidirish..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            className="pl-10 h-11 bg-white"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        Students List
                        <Badge variant="secondary" className="font-mono">
                            {totalElements}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="p-20 text-center text-muted-foreground font-medium animate-pulse">
                            Yuklanmoqda...
                        </div>
                    ) : (
                        <>
                            <div className="divide-y divide-slate-100">
                                {students.map((student: any) => (
                                    <div
                                        key={student.id}
                                        className="p-6 hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                                            <div className="space-y-4 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-bold text-slate-900">
                                                        {student.firstName}{" "}
                                                        {student.lastName}
                                                    </h3>
                                                    <Badge
                                                        variant={
                                                            student.isBlocked
                                                                ? "destructive"
                                                                : "outline"
                                                        }
                                                        className={
                                                            !student.isBlocked
                                                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                                : ""
                                                        }
                                                    >
                                                        {student.isBlocked
                                                            ? "Blocked"
                                                            : "Active"}
                                                    </Badge>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                    <InfoItem
                                                        label="TG ID"
                                                        value={student.tgId}
                                                        onCopy={() =>
                                                            copyToClipboard(
                                                                student.tgId,
                                                                "ID"
                                                            )
                                                        }
                                                    />
                                                    <InfoItem
                                                        label="Phone"
                                                        value={
                                                            student.phoneNumber
                                                        }
                                                        onCopy={() =>
                                                            copyToClipboard(
                                                                student.phoneNumber,
                                                                "Telefon"
                                                            )
                                                        }
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-muted-foreground w-20">
                                                            Username:
                                                        </span>
                                                        <span className="font-semibold text-blue-600">
                                                            @
                                                            {student.tgUsername ||
                                                                "n/a"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {student.isBlocked && (
                                                    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg text-red-800">
                                                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                                        <div>
                                                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                                                                Block Reason
                                                            </p>
                                                            <p className="text-sm font-medium">
                                                                {student.blockedReason ||
                                                                    "Sabab ko'rsatilmagan"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-row lg:flex-col gap-2 shrink-0 self-center">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1"
                                                        onClick={() =>
                                                            openModal(
                                                                "detail",
                                                                student.id
                                                            )
                                                        }
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />{" "}
                                                        Details
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1"
                                                        onClick={() =>
                                                            openModal(
                                                                "edit",
                                                                student.id
                                                            )
                                                        }
                                                    >
                                                        <Edit className="w-4 h-4 mr-2" />{" "}
                                                        Edit
                                                    </Button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant={
                                                            student.isBlocked
                                                                ? "outline"
                                                                : "secondary"
                                                        }
                                                        size="sm"
                                                        className={`flex-1 ${
                                                            !student.isBlocked
                                                                ? "text-orange-600 bg-orange-50 hover:bg-orange-100 border-orange-100"
                                                                : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-100"
                                                        }`}
                                                        onClick={() =>
                                                            openModal(
                                                                "block",
                                                                student.id
                                                            )
                                                        }
                                                    >
                                                        {student.isBlocked ? (
                                                            <>
                                                                <Unlock className="w-4 h-4 mr-2" />{" "}
                                                                Unblock
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Ban className="w-4 h-4 mr-2" />{" "}
                                                                Block
                                                            </>
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                        onClick={() =>
                                                            openModal(
                                                                "delete",
                                                                student.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />{" "}
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-slate-100 bg-white">
                                <div className="flex items-center gap-6 text-sm text-slate-600">
                                    <p>
                                        Showing{" "}
                                        <span className="font-semibold text-slate-900">
                                            {from}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-semibold text-slate-900">
                                            {to}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-slate-900">
                                            {totalElements}
                                        </span>{" "}
                                        results
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="whitespace-nowrap">
                                            Show:
                                        </span>
                                        <Select
                                            value={pageSize.toString()}
                                            onValueChange={(v) => {
                                                setPageSize(Number(v));
                                                setPage(1);
                                            }}
                                        >
                                            <SelectTrigger className="h-8 w-24 bg-white border-slate-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">
                                                    5
                                                </SelectItem>
                                                <SelectItem value="10">
                                                    10
                                                </SelectItem>
                                                <SelectItem value="20">
                                                    20
                                                </SelectItem>
                                                <SelectItem value="50">
                                                    50
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={page === 1}
                                        onClick={() => setPage((p) => p - 1)}
                                        className="text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-1" />{" "}
                                        Previous
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        )
                                            .filter(
                                                (p) =>
                                                    p === 1 ||
                                                    p === totalPages ||
                                                    Math.abs(p - page) <= 1
                                            )
                                            .map((p, idx, arr) => (
                                                <div
                                                    key={p}
                                                    className="flex items-center"
                                                >
                                                    {idx > 0 &&
                                                        arr[idx - 1] !==
                                                            p - 1 && (
                                                            <span className="px-2 text-slate-400">
                                                                ...
                                                            </span>
                                                        )}
                                                    <Button
                                                        variant={
                                                            page === p
                                                                ? "default"
                                                                : "ghost"
                                                        }
                                                        size="sm"
                                                        onClick={() =>
                                                            setPage(p)
                                                        }
                                                        className={`h-8 w-8 p-0 rounded-md ${
                                                            page === p
                                                                ? "bg-slate-800 text-white hover:bg-slate-900"
                                                                : "text-slate-600 hover:bg-slate-100"
                                                        }`}
                                                    >
                                                        {p}
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={page === totalPages}
                                        onClick={() => setPage((p) => p + 1)}
                                        className="text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                                    >
                                        Next{" "}
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {modalType === "detail" && selectedStudent && (
                <StudentDetailModal
                    studentId={selectedStudent}
                    onClose={closeModal}
                />
            )}
            {modalType === "edit" && selectedStudent && (
                <StudentEditModal
                    studentId={selectedStudent}
                    onClose={closeModal}
                />
            )}
            {modalType === "block" && selectedStudent && (
                <StudentBlockModal
                    studentId={selectedStudent}
                    onClose={closeModal}
                />
            )}
            {modalType === "delete" && selectedStudent && (
                <StudentDeleteModal
                    studentId={selectedStudent}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

function StatCard({
    label,
    value,
    icon,
    variant,
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
    variant?: "active" | "blocked";
}) {
    const variants = {
        active: "text-emerald-600 bg-emerald-50",
        blocked: "text-red-600 bg-red-50",
        default: "text-slate-600 bg-slate-50",
    };
    return (
        <Card className="border-none shadow-sm relative overflow-hidden">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                            {label}
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                            {value}
                        </p>
                    </div>
                    <div
                        className={`p-3 rounded-xl ${
                            variant ? variants[variant] : variants.default
                        }`}
                    >
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function InfoItem({
    label,
    value,
    onCopy,
}: {
    label: string;
    value: string;
    onCopy: () => void;
}) {
    return (
        <div className="flex items-center gap-2 group/info">
            <span className="text-muted-foreground w-20">{label}:</span>
            <span className="font-semibold text-slate-700">
                {value || "N/A"}
            </span>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover/info:opacity-100 transition-opacity"
                onClick={onCopy}
            >
                <Copy className="w-3 h-3 text-slate-400 hover:text-blue-500" />
            </Button>
        </div>
    );
}
