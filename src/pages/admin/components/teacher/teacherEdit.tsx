import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { TEACHER_SPECIFICATIONS } from "@/types/admin-type";
import { useEditTeacher } from "../../service/mutate/teacher/useEditTeacher";

interface TeacherEditModalProps {
    teacher: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TeacherEditModal = ({
    teacher,
    open,
    onOpenChange,
}: TeacherEditModalProps) => {
    const { mutate, isPending } = useEditTeacher();

    const { register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            description: "",
            experience: "",
            hourPrice: 0,
            level: "",
            portfolioLink: "",
            specification: "ENGLISH",
        },
    });

    const specValue = watch("specification");

    useEffect(() => {
        if (teacher) {
            reset({
                fullName: teacher.fullName || "",
                phoneNumber: teacher.phoneNumber || "",
                description: teacher.description || "",
                experience: teacher.experience || "",
                hourPrice: teacher.hourPrice || 0,
                level: teacher.level || "",
                portfolioLink: teacher.portfolioLink || "",
                specification: teacher.specification || "ENGLISH",
            });
        }
    }, [teacher, reset]);

    const queryClient = useQueryClient();
    const onSubmit = (formData: any) => {
        mutate(
            { id: teacher.id, data: formData },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["teacherList"],
                    });
                    toast.success("Ma'lumotlar yangilandi", {
                        position: "top-right",
                    });
                    onOpenChange(false);
                },
                onError: (error) => {
                    console.error("Xatolik:", error);
                    toast.error("Xatolik yuz berdi");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125 p-6 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        Update Item
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mt-2"
                >
                    <div className="space-y-3">
                        <Input
                            {...register("fullName")}
                            placeholder="Full Name"
                            className="h-11 bg-slate-50 border-slate-200"
                        />
                        <Input
                            {...register("phoneNumber")}
                            placeholder="Phone Number"
                            className="h-11 bg-slate-50 border-slate-200"
                        />
                        <Input
                            {...register("description")}
                            placeholder="Bio"
                            className="h-11 bg-slate-50 border-slate-200"
                        />
                        <Input
                            {...register("experience")}
                            placeholder="Experience (e.g. 1 Year)"
                            className="h-11 bg-slate-50 border-slate-200"
                        />
                        <Input
                            {...register("hourPrice")}
                            type="number"
                            placeholder="Price"
                            className="h-11 bg-slate-50 border-slate-200"
                        />
                        <Input
                            {...register("level")}
                            placeholder="Level (e.g. B1, Senior)"
                            className="h-11 bg-slate-50 border-slate-200"
                        />
                        <Input
                            {...register("portfolioLink")}
                            placeholder="Portfolio Video Link"
                            className="h-11 bg-slate-50 border-slate-200"
                        />

                        <Select
                            value={specValue}
                            onValueChange={(value) =>
                                setValue("specification", value)
                            }
                        >
                            <SelectTrigger className="h-11 bg-slate-50 border-slate-200 w-full focus:ring-0">
                                <SelectValue placeholder="Select Specification" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {Object.values(TEACHER_SPECIFICATIONS).map(
                                    (spec) => (
                                        <SelectItem key={spec} value={spec}>
                                            {spec.charAt(0) +
                                                spec.slice(1).toLowerCase()}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="h-10 px-6 font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="h-10 px-8 bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                        >
                            {isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
