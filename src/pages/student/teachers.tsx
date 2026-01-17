import { useState } from "react";
import { useTeachers } from "./service/query/useTeacherList";
import {
    Search,
    SlidersHorizontal,
    Star,
    BookOpen,
    GraduationCap,
    DollarSign,
    Briefcase,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

export const TeacherPage = () => {
    const { data: response, isLoading } = useTeachers();
    const [searchTerm, setSearchTerm] = useState("");

    const teachers = response?.data || [];

    const filteredTeachers = teachers.filter(
        (t: any) =>
            t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.specification.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-slate-50/50 pb-24 pt-4 px-4">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Ustozlar ro'yxati
                </h1>
                <p className="text-sm text-slate-500 mt-2">
                    Siz uchun mos ustozni toping va bilimingizni oshiring.
                </p>
            </div>

            <Card className="border-none shadow-sm mb-8 overflow-hidden">
                <CardContent className="p-4">
                    <div className="relative mb-4">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <Input
                            placeholder="Ism yoki mutaxassislik bo'yicha izlash..."
                            className="pl-10 h-12 bg-slate-50/50 border-slate-100 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Accordion
                        type="single"
                        collapsible
                        className="border-none"
                    >
                        <AccordionItem value="filters" className="border-none">
                            <AccordionTrigger className="hover:no-underline py-2 justify-center gap-2 bg-slate-100 rounded-xl font-bold text-slate-700">
                                <SlidersHorizontal size={16} /> Filtrlar
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <FilterSelect
                                        placeholder="Daraja"
                                        items={[
                                            "A1",
                                            "A2",
                                            "B1",
                                            "B2",
                                            "C1",
                                            "C2",
                                        ]}
                                    />
                                    <FilterSelect
                                        placeholder="Narx"
                                        items={["30000", "50000", "100000"]}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {isLoading ? (
                    Array(3)
                        .fill(0)
                        .map((_, i) => <TeacherSkeleton key={i} />)
                ) : filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher: any) => (
                        <TeacherCard key={teacher.id} teacher={teacher} />
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-500">
                        Ustozlar topilmadi.
                    </div>
                )}
            </div>
        </div>
    );
};

const TeacherCard = ({ teacher }: any) => (
    <Card className="border-none shadow-md overflow-hidden bg-white group active:scale-[0.98] transition-transform">
        <div className="relative aspect-square w-full bg-slate-200 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-10" />
            <img
                src={
                    teacher.imageUrl ||
                    "https://ui-avatars.com/api/?name=" + teacher.fullName
                }
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={teacher.fullName}
            />

            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                <Badge className="bg-emerald-500 text-white border-none px-3 py-1 font-bold">
                    {teacher.specification}
                </Badge>
                <Badge className="bg-white/90 backdrop-blur-md text-amber-500 border-none flex gap-1 items-center px-3 py-1">
                    <Star size={14} fill="currentColor" />
                    {teacher.rating || "0.0"}
                </Badge>
            </div>

            <div className="absolute bottom-4 left-4 z-20 text-white">
                <h2 className="text-2xl font-bold leading-tight">
                    {teacher.fullName}
                </h2>
                <p className="text-white/80 text-sm flex items-center gap-1">
                    <GraduationCap size={14} /> {teacher.level} Daraja
                </p>
            </div>
        </div>

        <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Briefcase size={16} />
                        <span className="text-[10px] font-bold uppercase">
                            Tajriba
                        </span>
                    </div>
                    <p className="text-lg font-bold text-slate-800">
                        {teacher.experience} yil
                    </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <DollarSign size={16} />
                        <span className="text-[10px] font-bold uppercase">
                            Soatiga
                        </span>
                    </div>
                    <p className="text-lg font-bold text-emerald-600">
                        {teacher.hourPrice?.toLocaleString()}
                    </p>
                </div>
            </div>

            <p className="text-sm text-slate-600 line-clamp-2 italic">
                "
                {teacher.description ||
                    "O'quvchilarga ingliz tilini o'rgatishda katta tajribaga egaman."}
                "
            </p>

            <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-base font-bold gap-3">
                <BookOpen size={20} />
                Darsni band qilish
            </Button>
        </CardContent>
    </Card>
);

const FilterSelect = ({ placeholder, items }: any) => (
    <Select>
        <SelectTrigger className="bg-white border-slate-200 rounded-xl h-11 text-slate-600">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {items.map((item: string) => (
                <SelectItem key={item} value={item.toLowerCase()}>
                    {item}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const TeacherSkeleton = () => (
    <div className="space-y-4 mb-6">
        <Skeleton className="aspect-square w-full rounded-3xl" />
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
        </div>
        <Skeleton className="h-14 w-full rounded-2xl" />
    </div>
);
