import { Trash2, AlertTriangle, User } from "lucide-react";
import { useStudent } from "../../service/query/student/useStudent";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDeleteStudent } from "../../service/mutate/student/useStudentDelete";

interface StudentDeleteModalProps {
    studentId: string;
    onClose: () => void;
}

export function StudentDeleteModal({
    studentId,
    onClose,
}: StudentDeleteModalProps) {
    const queryClient = useQueryClient();
    const { data, isLoading } = useStudent(studentId);
    const deleteStudent = useDeleteStudent();
    const student = data?.data;

    const handleDelete = () => {
        deleteStudent.mutate(studentId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["studentList"] });
                toast.error("Talaba tizimdan o'chirildi", {
                    position: "top-right",
                    description: "Barcha bog'liq ma'lumotlar yo'q qilindi.",
                });
                onClose();
            },
        });
    };

    if (isLoading) return null;

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-115 p-0 overflow-hidden border-none rounded-[32px] gap-0">
                <div className="p-8 pb-4">
                    <DialogHeader className="items-center text-center">
                        <div className="mb-4 p-4 rounded-full bg-red-50 text-red-600 ring-8 ring-red-50/50">
                            <Trash2 size={32} />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-slate-900">
                            Talabani o'chirish
                        </DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            Haqiqatan ham ushbu talabani o'chirib
                            tashlamoqchimisiz?
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="px-8 pb-8 space-y-6">
                    {student && (
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                    <User className="w-6 h-6 text-slate-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-900 truncate">
                                        {student.firstName} {student.lastName}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Badge
                                            variant={
                                                student.isBlocked
                                                    ? "destructive"
                                                    : "outline"
                                            }
                                            className="text-[10px] h-5 px-1.5 uppercase font-bold tracking-wider"
                                        >
                                            {student.isBlocked
                                                ? "Blocked"
                                                : "Active"}
                                        </Badge>
                                        <span className="text-xs text-slate-400">
                                            ID: {student.tgId}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-slate-200/50" />

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">
                                    Telefon raqami:
                                </span>
                                <span className="font-semibold text-slate-700">
                                    {student.phoneNumber}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 p-4 rounded-2xl bg-red-50/50 border border-red-100/50">
                        <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-red-900 uppercase tracking-tight">
                                Qaytarib bo'lmaydigan amal!
                            </p>
                            <p className="text-xs text-red-700 leading-relaxed">
                                Talaba o'chirilsa, uning barcha{" "}
                                <strong>kurslari, to'lovlari</strong> va
                                <strong> statistikalari</strong> tizimdan
                                butunlay yo'qoladi.
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 flex-row gap-3 sm:justify-center">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-12 rounded-2xl font-bold border-slate-200 text-slate-600 hover:bg-white active:scale-95 transition-all"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteStudent.isPending || !student}
                        className="flex-1 h-12 rounded-2xl font-bold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 active:scale-95 transition-all"
                    >
                        {deleteStudent.isPending ? (
                            <div className="flex items-center gap-2">
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                O'chirilmoqda...
                            </div>
                        ) : (
                            "Tasdiqlayman"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
