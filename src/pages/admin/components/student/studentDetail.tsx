import {
    User,
    Phone,
    MessageSquare,
    Globe,
    Clock,
    ShieldAlert,
    Calendar,
    Hash,
    Info,
} from "lucide-react";
import { useStudent } from "../../service/query/student/useStudent";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentDetailModalProps {
    studentId: string;
    onClose: () => void;
}

export function StudentDetailModal({
    studentId,
    onClose,
}: StudentDetailModalProps) {
    const { data, isLoading } = useStudent(studentId);
    const student = data?.data;

    if (isLoading) return null;

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[32px] gap-0">
                <DialogHeader className="p-8 border-b bg-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-slate-100 text-slate-600">
                            <User size={24} />
                        </div>
                        <div className="space-y-1">
                            <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
                                Student Details
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                                Talaba haqidagi to'liq tizim ma'lumotlari
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <ScrollArea className="max-h-[70vh]">
                    <div className="p-8 space-y-8">
                        {!student ? (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                <Info className="w-12 h-12 mb-4 opacity-20" />
                                <p>Student ma'lumotlari topilmadi</p>
                            </div>
                        ) : (
                            <>
                                <div
                                    className={`flex items-center justify-between p-5 rounded-[24px] border transition-all ${
                                        student.isBlocked
                                            ? "bg-red-50/50 border-red-100 text-red-900"
                                            : "bg-emerald-50/50 border-emerald-100 text-emerald-900"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`p-2.5 rounded-full ${
                                                student.isBlocked
                                                    ? "bg-red-100"
                                                    : "bg-emerald-100"
                                            }`}
                                        >
                                            <ShieldAlert
                                                size={20}
                                                className={
                                                    student.isBlocked
                                                        ? "text-red-600"
                                                        : "text-emerald-600"
                                                }
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                                                Status
                                            </p>
                                            <p className="text-base font-bold">
                                                {student.isBlocked
                                                    ? "Blocked Account"
                                                    : "Active Student"}
                                            </p>
                                        </div>
                                    </div>
                                    {student.isBlocked &&
                                        student.blockedReason && (
                                            <Badge
                                                variant="destructive"
                                                className="px-4 py-1 rounded-full"
                                            >
                                                {student.blockedReason}
                                            </Badge>
                                        )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DetailItem
                                        icon={<User size={16} />}
                                        label="First Name"
                                        value={student.firstName}
                                    />
                                    <DetailItem
                                        icon={<User size={16} />}
                                        label="Last Name"
                                        value={student.lastName}
                                    />
                                    <DetailItem
                                        icon={<Hash size={16} />}
                                        label="Telegram ID"
                                        value={student.tgId}
                                    />
                                    <DetailItem
                                        icon={<MessageSquare size={16} />}
                                        label="Username"
                                        value={
                                            student.tgUsername
                                                ? `@${student.tgUsername}`
                                                : "N/A"
                                        }
                                        highlight
                                    />
                                    <DetailItem
                                        icon={<Phone size={16} />}
                                        label="Phone Number"
                                        value={student.phoneNumber}
                                    />
                                    <DetailItem
                                        icon={<Globe size={16} />}
                                        label="Interface Language"
                                        value={
                                            student.languageCode?.toUpperCase() ||
                                            "UZ"
                                        }
                                    />
                                </div>

                                <Card className="bg-slate-50/50 border-slate-100 rounded-[24px] shadow-none">
                                    <CardContent className="p-6">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                                            Bio / Additional Info
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed italic">
                                            "
                                            {student.bio ||
                                                "Ushbu talaba haqida qo'shimcha ma'lumot mavjud emas."}
                                            "
                                        </p>
                                    </CardContent>
                                </Card>

                                <Separator className="bg-slate-100" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-slate-100 text-slate-400">
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-slate-400">
                                                Created At
                                            </p>
                                            <p className="text-sm font-semibold text-slate-700">
                                                {formatFullDate(
                                                    student.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-slate-100 text-slate-400">
                                            <Calendar size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-slate-400">
                                                Last Updated
                                            </p>
                                            <p className="text-sm font-semibold text-slate-700">
                                                {formatFullDate(
                                                    student.updatedAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>

                <div className="p-8 border-t bg-slate-50/50 flex gap-3 shrink-0">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full h-12 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-white"
                    >
                        Yopish
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DetailItem({
    icon,
    label,
    value,
    highlight = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    highlight?: boolean;
}) {
    return (
        <div className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-2 mb-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                {icon}
                <span className="text-[10px] font-bold uppercase tracking-widest">
                    {label}
                </span>
            </div>
            <p
                className={`text-[15px] font-bold truncate ${
                    highlight ? "text-blue-600" : "text-slate-900"
                }`}
            >
                {value || "N/A"}
            </p>
        </div>
    );
}

function formatFullDate(dateString: string) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("uz-UZ", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
