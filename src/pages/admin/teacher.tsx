import { useState } from "react";
import {
    Search,
    Mail,
    Phone,
    Star,
    Trash,
    Award,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    TEACHER_SPECIFICATIONS,
    type SortOrder,
    type Teacher,
    type TeacherSortField,
} from "@/types/admin-type";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTeacherList } from "./service/query/teacher/useTeacherList";
import { useChangeTeacherStatus } from "./service/mutate/teacher/useChangeActiveTeacher";
import { TeacherDeleteModal } from "./components/teacher/teacherDelete";
import { TeacherEditModal } from "./components/teacher/teacherEdit";
import { TeacherDetailsModal } from "./components/teacher/teacherDetail";

export const TeacherPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isPending } = useTeacherList(page, pageSize);

    const role = Cookies.get("role");
    const navigate = useNavigate();

    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [levelFilter, setLevelFilter] = useState<string>("all");
    const [languageFilter, setLanguageFilter] = useState<string>("all");

    const [sortField, setSortField] = useState<TeacherSortField>("name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

    const [editTeacher, setEditTeacher] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { mutate: changeStatus, isPending: isStatusPending } =
        useChangeTeacherStatus();

    const handleEditClick = (teacher: any) => {
        setEditTeacher(teacher);
        setIsEditModalOpen(true);
    };

    const [deleteTeacher, setDeleteTeacher] = useState<any | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteClick = (teacher: any) => {
        setDeleteTeacher(teacher);
        setIsDeleteModalOpen(true);
    };

    const toggleSort = (field: TeacherSortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    if (isPending) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-10 w-48 rounded-md" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-4">
                            <Skeleton className="h-20 w-full" />
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const teachers: Teacher[] = data?.data || [];
    const totalPages = data?.totalPages || 1;
    const totalElements = data?.totalElements || 0;
    const from = data?.from || 0;
    const to = data?.to || 0;

    const uniqueLevels = Array.from(
        new Set(teachers.map((t) => t.level).filter(Boolean))
    );

    const filteredTeachers = teachers
        .filter((t) => {
            const matchesSearch =
                (t.fullName || t.name || "")
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                t.email?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" ? t.isActive : !t.isActive);
            const matchesLevel =
                levelFilter === "all" || t.level === levelFilter;
            const matchesLanguage =
                languageFilter === "all" || t.specification === languageFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesLevel &&
                matchesLanguage
            );
        })
        .sort((a, b) => {
            let comparison = 0;
            switch (sortField) {
                case "name":
                    comparison = (a.fullName || a.name || "").localeCompare(
                        b.fullName || b.name || ""
                    );
                    break;
                case "email":
                    comparison = (a.email || "").localeCompare(b.email || "");
                    break;
                case "rating":
                    comparison =
                        (Number(a.rating) || 0) - (Number(b.rating) || 0);
                    break;
                case "price":
                    comparison =
                        (Number(a.hourPrice) || 0) - (Number(b.hourPrice) || 0);
                    break;
                case "lessons":
                    comparison =
                        (Number(a.lessonsCount) || 0) -
                        (Number(b.lessonsCount) || 0);
                    break;
                case "createdAt":
                    comparison =
                        new Date(a.createdAt || 0).getTime() -
                        new Date(b.createdAt || 0).getTime();
                    break;
            }
            return sortOrder === "asc" ? comparison : -comparison;
        });

    const getInitials = (name: string) => {
        if (!name) return "??";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleOpenDetails = (id: string) => {
        setSelectedTeacherId(id);
        setIsModalOpen(true);
    };

    const handleStatusToggle = (id: string) => {
        changeStatus(id, {
            onSuccess: () =>
                toast.success(`Muvaffaqiyatli bajarildi`, {
                    position: "top-right",
                }),
            onError: () => toast.error("Xatolik yuz berdi"),
        });
    };

    const handleReset = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setLevelFilter("all");
        setLanguageFilter("all");
        setSortField("name");
        setSortOrder("asc");
        setPage(1);
    };

    const getSortIcon = (field: TeacherSortField) => {
        if (sortField !== field)
            return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />;
        return sortOrder === "asc" ? (
            <ArrowUp className="w-3.5 h-3.5 text-gray-700" />
        ) : (
            <ArrowDown className="w-3.5 h-3.5 text-gray-700" />
        );
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
                {role === "superadmin" && (
                    <Button
                        onClick={() => navigate("/admin/teachers/deleted")}
                        className="bg-black hover:bg-gray-800 text-white flex items-center gap-2 cursor-pointer"
                    >
                        <Trash className="w-4 h-4" /> O'chirilgan Teacher'lar
                    </Button>
                )}
            </div>

            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search by name, email or bio"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className="pl-10 h-10 bg-white border-gray-200 text-black"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={handleReset}
                    className="cursor-pointer text-black border-gray-200 hover:bg-gray-50"
                >
                    Reset
                </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    <Select
                        value={statusFilter}
                        onValueChange={(v) => {
                            setStatusFilter(v);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-24 h-8 bg-white border-gray-200">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium">Level:</span>
                    <Select
                        value={levelFilter}
                        onValueChange={(v) => {
                            setLevelFilter(v);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-32 h-8 bg-white border-gray-200">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            {uniqueLevels.map((level) => (
                                <SelectItem key={level} value={level!}>
                                    {level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium">Language:</span>
                    <Select
                        value={languageFilter}
                        onValueChange={(v) => {
                            setLanguageFilter(v);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-36 h-8 bg-white border-gray-200">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Languages</SelectItem>
                            {Object.values(TEACHER_SPECIFICATIONS).map(
                                (lang) => (
                                    <SelectItem key={lang} value={lang}>
                                        {lang.charAt(0) +
                                            lang.slice(1).toLowerCase()}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center gap-8 text-[13px] font-medium text-gray-700 px-2 py-2 pt-4">
                <span className="text-gray-400">Sort by:</span>
                <button
                    onClick={() => toggleSort("name")}
                    className={`flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors ${
                        sortField === "name" ? "text-gray-900" : ""
                    }`}
                >
                    Name {getSortIcon("name")}
                </button>
                <button
                    onClick={() => toggleSort("email")}
                    className={`flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors ${
                        sortField === "email" ? "text-gray-900" : ""
                    }`}
                >
                    Email {getSortIcon("email")}
                </button>
                <button
                    onClick={() => toggleSort("rating")}
                    className={`flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors ${
                        sortField === "rating" ? "text-gray-900" : ""
                    }`}
                >
                    Rating {getSortIcon("rating")}
                </button>
                <button
                    onClick={() => toggleSort("price")}
                    className={`flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors ${
                        sortField === "price" ? "text-gray-900" : ""
                    }`}
                >
                    Price {getSortIcon("price")}
                </button>
                <button
                    onClick={() => toggleSort("lessons")}
                    className={`flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors ${
                        sortField === "lessons" ? "text-gray-900" : ""
                    }`}
                >
                    Lessons {getSortIcon("lessons")}
                </button>
                <button
                    onClick={() => toggleSort("createdAt")}
                    className={`flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors ${
                        sortField === "createdAt" ? "text-gray-900" : ""
                    }`}
                >
                    Created Date {getSortIcon("createdAt")}
                </button>
            </div>

            <div className="space-y-4">
                {filteredTeachers.length === 0 ? (
                    <Card className="p-12 text-center text-gray-500">
                        No teachers found
                    </Card>
                ) : (
                    filteredTeachers.map((teacher) => (
                        <Card
                            key={teacher.id}
                            className="px-4 py-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4 w-[35%] min-w-[320px] shrink-0">
                                    <Avatar className="h-14 w-14 rounded-full border border-gray-100">
                                        <AvatarImage
                                            src={teacher.imageUrl}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-gray-50 text-gray-500 font-bold">
                                            {getInitials(
                                                teacher.fullName || teacher.name
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-lg truncate">
                                                {teacher.fullName ||
                                                    teacher.name}
                                            </h3>
                                            <Badge
                                                className={`text-[10px] px-2 py-0.5 rounded-full border-none font-bold uppercase shadow-none ${
                                                    teacher.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-red-500"
                                                }`}
                                            >
                                                {teacher.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <span className="text-blue-600 font-medium">
                                                🌐{" "}
                                                {teacher.specification || "❌"}
                                            </span>
                                            <span className="flex items-center gap-1 font-medium">
                                                <Award className="w-4 h-4 text-orange-500" />
                                                {teacher.level || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-1.5 w-[30%] px-6 border-l border-gray-100 shrink-0">
                                    <div
                                        className="flex items-center gap-3 text-sm text-gray-600 font-medium truncate cursor-pointer hover:text-blue-600 transition-colors"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                teacher.email
                                            );
                                            toast.success("Email copied!");
                                        }}
                                    >
                                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />{" "}
                                        <span className="truncate">
                                            {teacher.email}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-3 text-sm text-gray-600 font-medium cursor-pointer hover:text-blue-600 transition-colors"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                teacher.phoneNumber
                                            );
                                            toast.success(
                                                "Phone number copied!"
                                            );
                                        }}
                                    >
                                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />{" "}
                                        <span>{teacher.phoneNumber}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center w-[10%] shrink-0">
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                        <Star className="w-5 h-5 fill-yellow-500" />{" "}
                                        {Number(teacher.rating).toFixed(1)}
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-medium uppercase">
                                        Rating
                                    </span>
                                </div>
                                <div className="flex items-center justify-end gap-2 flex-1 pl-4 border-l border-gray-100">
                                    <Button
                                        variant="outline"
                                        className="h-9 px-4 text-xs font-semibold cursor-pointer"
                                        onClick={() =>
                                            handleOpenDetails(teacher.id)
                                        }
                                    >
                                        More
                                    </Button>
                                    <Button
                                        variant={
                                            teacher.isActive
                                                ? "outline"
                                                : "default"
                                        }
                                        className={`h-9 px-4 text-xs font-semibold cursor-pointer ${
                                            !teacher.isActive &&
                                            "bg-black text-white hover:bg-gray-800"
                                        }`}
                                        onClick={() =>
                                            handleStatusToggle(teacher.id)
                                        }
                                        disabled={isStatusPending}
                                    >
                                        {teacher.isActive
                                            ? "Deactivate"
                                            : "Activate"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-9 px-4 text-xs font-semibold cursor-pointer"
                                        onClick={() => handleEditClick(teacher)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="h-9 px-4 text-xs font-semibold bg-red-600 hover:bg-red-700 cursor-pointer"
                                        onClick={() =>
                                            handleDeleteClick(teacher)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-gray-100 mt-6">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                    <p>
                        Showing{" "}
                        <span className="font-semibold text-gray-900">
                            {from}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-gray-900">
                            {to}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900">
                            {totalElements}
                        </span>{" "}
                        results
                    </p>
                    <div className="flex items-center gap-2">
                        <span>Show:</span>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(v) => {
                                setPageSize(Number(v));
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="h-8 w-30 bg-white border-gray-200">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 per page</SelectItem>
                                <SelectItem value="10">10 per page</SelectItem>
                                <SelectItem value="20">20 per page</SelectItem>
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
                        className="text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((p) => (
                            <Button
                                key={p}
                                variant={page === p ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setPage(p)}
                                className={`h-8 w-8 p-0 rounded-md transition-colors ${
                                    page === p
                                        ? "bg-black text-white hover:bg-gray-800"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {p}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                    >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>

            {selectedTeacherId && (
                <TeacherDetailsModal
                    id={selectedTeacherId}
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                />
            )}
            <TeacherEditModal
                teacher={editTeacher}
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
            />
            <TeacherDeleteModal
                teacher={deleteTeacher}
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            />
        </div>
    );
};
