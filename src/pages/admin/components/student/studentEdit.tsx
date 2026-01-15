import React, { useState, useEffect } from "react";
import { X, User, Info } from "lucide-react";
import { useStudent } from "../../service/query/student/useStudent";
import { useUpdateStudent } from "../../service/mutate/student/useStudentEdit";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StudentEditModalProps {
    studentId: string;
    onClose: () => void;
}

export function StudentEditModal({
    studentId,
    onClose,
}: StudentEditModalProps) {
    const queryClient = useQueryClient();
    const { data, isLoading } = useStudent(studentId);
    const updateStudent = useUpdateStudent();
    const student = data?.data;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
    });

    useEffect(() => {
        if (student) {
            setFormData({
                firstName: student.firstName || "",
                lastName: student.lastName || "",
                phoneNumber: student.phoneNumber || "",
                email: student.email || "",
            });
        }
    }, [student]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateStudent.mutate(
            {
                id: studentId, ...formData,
                data: undefined
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["studentsList"],
                    });
                    toast.success("Ma'lumotlar saqlandi", {
                        position: "top-right",
                    });
                    onClose();
                },
            }
        );
    };

    if (isLoading) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-[32px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                <div className="p-8 border-b flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-2xl text-gray-600">
                            <User size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-none">
                                Edit Student
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                O'zgarishlarni kiriting va saqlang
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="rounded-full hover:bg-gray-100"
                    >
                        <X size={20} className="text-gray-400" />
                    </Button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="overflow-y-auto flex-1 p-8 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="firstName"
                                className="text-sm font-medium text-gray-700 ml-1"
                            >
                                First Name{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        firstName: e.target.value,
                                    })
                                }
                                required
                                className="rounded-xl h-12 border-gray-200 focus:border-black focus:ring-0 text-gray-900 bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="lastName"
                                className="text-sm font-medium text-gray-700 ml-1"
                            >
                                Last Name{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        lastName: e.target.value,
                                    })
                                }
                                required
                                className="rounded-xl h-12 border-gray-200 focus:border-black focus:ring-0 text-gray-900 bg-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="phone"
                                className="text-sm font-medium text-gray-700 ml-1"
                            >
                                Phone Number{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phoneNumber: e.target.value,
                                    })
                                }
                                required
                                className="rounded-xl h-12 border-gray-200 focus:border-black focus:ring-0 text-gray-900 bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700 ml-1"
                            >
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="rounded-xl h-12 border-gray-200 focus:border-black focus:ring-0 text-gray-900 bg-white"
                                placeholder="example@mail.com"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 p-5 bg-gray-50 rounded-4xl border border-gray-100">
                        <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        <p className="text-[13px] text-gray-500 leading-relaxed">
                            Telegram ma'lumotlari (ID va Username) avtomatik
                            sinxronizatsiya qilinadi va ularni bu yerdan
                            o'zgartirib bo'lmaydi.
                        </p>
                    </div>
                </form>

                <div className="p-8 border-t flex gap-4 bg-white">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-14 rounded-2xl font-semibold border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={updateStudent.isPending}
                        className="flex-1 h-14 rounded-2xl font-semibold bg-[#111111] hover:bg-black text-white transition-all"
                    >
                        {updateStudent.isPending
                            ? "Saqlanmoqda..."
                            : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
