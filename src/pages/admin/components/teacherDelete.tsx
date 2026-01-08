import { useState } from "react";
import { useDeleteTeacher } from "../service/mutate/useDeleteTeacher";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import type { TeacherDeleteModalProps } from "@/types/admin-type";

export const TeacherDeleteModal = ({
    teacher,
    open,
    onOpenChange,
}: TeacherDeleteModalProps) => {
    const [reason, setReason] = useState("");
    const { mutate, isPending } = useDeleteTeacher();

    const handleDelete = () => {
        if (!reason.trim()) {
            toast.error("O'chirish sababini kiriting", {
                position: "top-right",
            });
            return;
        }

        mutate(
            { id: teacher.id, reason },
            {
                onSuccess: () => {
                    toast.success("Teacher deleted successfully!", {
                        position: "top-right",
                    });
                    onOpenChange(false);
                    setReason("");
                },
                onError: () => {
                    toast.error("Reason should not empty!", {
                        position: "top-right",
                    });
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-112.5 p-6 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        O'chirishni tasdiqlang
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <p className="text-sm text-gray-600">
                        "{teacher?.fullName || teacher?.name}"ni o'chirishga
                        ishonchingiz komilmi?
                    </p>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">
                            O'chirish sababi{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            placeholder="O'chirish sababini kiriting (majburiy, maksimal 500 belgi)..."
                            className="min-h-30 bg-slate-50 resize-none"
                            maxLength={500}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <p className="text-[11px] text-gray-400">
                            {reason.length}/500 belgi
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="h-10 px-6 font-semibold"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isPending || !reason.trim()}
                        className="h-10 px-6 bg-red-600 hover:bg-red-500 text-white font-semibold border-none"
                    >
                        {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Ha, o'chirish"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
