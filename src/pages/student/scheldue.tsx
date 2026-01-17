import { useMyLessons } from "./service/query/useMyLessons";
import {
    Video,
    Clock,
    DollarSign,
    Calendar,
    GraduationCap,
} from "lucide-react";

export const SchelduePage = () => {
    const { data, isLoading } = useMyLessons();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const lessons = data?.data || data?.data?.data || [];

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("uz-UZ", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("uz-UZ", {
            day: "numeric",
            month: "long",
        });
    };

    return (
        <div className="p-4 bg-slate-50 min-h-screen pb-24">
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-slate-800">
                    Darslarim
                </h1>
                <p className="text-slate-500 text-sm">
                    Barcha rejalashtirilgan darslaringiz ro'yxati
                </p>
            </div>

            {lessons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                    <Calendar className="text-slate-300 mb-2" size={48} />
                    <p className="text-slate-500 font-medium">
                        Hozircha darslar yo'q
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {lessons.map((lesson: any) => (
                        <div
                            key={lesson.id}
                            className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0">
                                <span
                                    className={`text-[10px] font-bold px-3 py-1 rounded-bl-2xl uppercase tracking-wider ${
                                        lesson.status === "AVAILABLE"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-blue-100 text-blue-700"
                                    }`}
                                >
                                    {lesson.status}
                                </span>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {lesson.name}
                                    </h2>
                                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                                        <Calendar size={14} />
                                        <span>
                                            {formatDate(lesson.startTime)}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center text-emerald-600 font-bold">
                                        <DollarSign size={16} />
                                        <span>
                                            {Number(
                                                lesson.price,
                                            ).toLocaleString()}{" "}
                                            so'm
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4">
                                <img
                                    src={
                                        lesson.teacher?.imageUrl ||
                                        "https://ui-avatars.com/api/?name=" +
                                            lesson.teacher?.fullName
                                    }
                                    alt="Teacher"
                                    className="w-12 h-12 rounded-xl object-cover border border-white shadow-sm"
                                />
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">
                                        {lesson.teacher?.fullName}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className="flex items-center gap-0.5">
                                            <GraduationCap size={12} />{" "}
                                            {lesson.teacher?.level}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {lesson.teacher?.experience} yil
                                            tajriba
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                        <Clock
                                            size={16}
                                            className="text-emerald-500"
                                        />
                                        <span>
                                            {formatTime(lesson.startTime)} -{" "}
                                            {formatTime(lesson.endTime)}
                                        </span>
                                    </div>
                                </div>

                                {lesson.googleMeetUrl && (
                                    <a
                                        href={lesson.googleMeetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-emerald-100"
                                    >
                                        <Video size={16} />
                                        Darsga kirish
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
