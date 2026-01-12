import { useState } from "react";
import { AlertTriangle, Unlock, User, MessageCircle } from "lucide-react";
import { useStudent } from "../../service/query/student/useStudent";
import { useBlockStudent } from "../../service/mutate/student/useStudentBloack";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface StudentBlockModalProps {
    studentId: string;
    onClose: () => void;
}

export function StudentBlockModal({
    studentId,
    onClose,
}: StudentBlockModalProps) {
    const queryClient = useQueryClient();
    const { data, isLoading } = useStudent(studentId);
    const blockStudent = useBlockStudent();
    const student = data?.data;

    const [reason, setReason] = useState("");
    const isBlocked = student?.isBlocked;

    const handleAction = () => {
        if (!isBlocked && !reason.trim()) {
            toast.error("Iltimos, bloklash sababini kiritib o'ting", {
                position: "top-right",
            });
            return;
        }

        blockStudent.mutate(
            { studentId, reason: isBlocked ? "" : reason },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["studentsList"],
                    });

                    toast.success(
                        isBlocked ? "Blokdan chiqarildi" : "Bloklandi",
                        {
                            description: isBlocked
                                ? "Talaba endi tizimdan foydalana oladi."
                                : "Talabaning tizimga kirishi cheklandi.",
                            position: "top-right",
                        }
                    );
                    queryClient.invalidateQueries({
                        queryKey: ["studentStats"],
                    });

                    onClose();
                },
            }
        );
    };

    if (isLoading) return null;

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-115 p-0 overflow-hidden border-none rounded-[32px] gap-0">
                <div className="p-8 pb-4">
                    <DialogHeader className="items-center text-center">
                        <div
                            className={`mb-4 p-4 rounded-full ring-8 transition-all ${
                                isBlocked
                                    ? "bg-emerald-50 text-emerald-600 ring-emerald-50/50"
                                    : "bg-orange-50 text-orange-600 ring-orange-50/50"
                            }`}
                        >
                            {isBlocked ? (
                                <Unlock size={32} />
                            ) : (
                                <AlertTriangle size={32} />
                            )}
                        </div>
                        <DialogTitle className="text-2xl font-bold text-slate-900">
                            {isBlocked
                                ? "Blokdan chiqarish"
                                : "Talabani bloklash"}
                        </DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            {student?.firstName} {student?.lastName} hisobining
                            holatini o'zgartirmoqchisiz.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="px-8 pb-8 space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                            <User size={20} />
                        </div>
                        <div className="flex-1 min-w-0 text-sm">
                            <p className="font-bold text-slate-900 truncate">
                                {student?.firstName} {student?.lastName}
                            </p>
                            <p className="text-slate-500">
                                {student?.phoneNumber}
                            </p>
                        </div>
                    </div>

                    {!isBlocked ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-700 ml-1">
                                <MessageCircle
                                    size={16}
                                    className="text-slate-400"
                                />
                                <Label
                                    htmlFor="reason"
                                    className="font-semibold"
                                >
                                    Bloklash sababi{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                            </div>
                            <Textarea
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Masalan: To'lov muddati o'tib ketgan yoki qoidabuzarlik..."
                                className="rounded-2xl border-slate-200 focus:ring-orange-500/20 focus:border-orange-500 min-h-25 bg-white text-slate-900 resize-none"
                            />
                        </div>
                    ) : (
                        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-800 text-xs leading-relaxed">
                            <strong>Eslatma:</strong> Blokdan chiqarilgandan
                            so'ng, foydalanuvchi tizimning barcha
                            funksiyalaridan qaytadan foydalana oladi.
                        </div>
                    )}
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
                        onClick={handleAction}
                        disabled={blockStudent.isPending}
                        className={`flex-1 h-12 rounded-2xl font-bold text-white shadow-lg active:scale-95 transition-all ${
                            isBlocked
                                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                                : "bg-orange-600 hover:bg-orange-700 shadow-orange-200"
                        }`}
                    >
                        {blockStudent.isPending ? (
                            <div className="flex items-center gap-2">
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Bajarilmoqda...
                            </div>
                        ) : isBlocked ? (
                            "Tasdiqlash"
                        ) : (
                            "Bloklash"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
