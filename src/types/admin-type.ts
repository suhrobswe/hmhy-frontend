export interface EditProfile {
    username: string;
    phoneNumber: string;
}

export interface ChangePassword {
    currentPassword: string;
    newPassword: string;
}

export type EditAdmin = {
    username?: string;
    phone?: string;
    password?: string;
};

export interface Admin {
    id: string;
    username: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface DetailsModalState {
    isOpen: boolean;
    admin: Admin | null;
}

export interface EditModalState {
    isOpen: boolean;
    admin: Admin | null;
    username: string;
    phone: string;
    password: string;
}

export interface DeleteConfirmState {
    isOpen: boolean;
    admin: Admin | null;
}

export interface AddAdminModalState {
    isOpen: boolean;
    username: string;
    password: string;
}

export interface MessageTranslations {
    uz: string;
    en: string;
    ru: string;
}

export interface Admin {
    id: string;
    username: string;
    phoneNumber: string;
}

export interface AdminListResponse {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: Admin[];
}

export interface CreateAdmin {
    username: string;
    phoneNumber: string;
    password: string;
}

export interface DashboardStats {
    totalStudents: number;
    totalTeachers: number;
    totalLessons: number;
    totalRevenue: number;
    charts: {
        lessonsByStatus: any[];
    };
}

export interface DashboardResponse {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: DashboardStats;
}

export interface PaymentStats {
    totalRevenue: number;
    pendingPayments: number;
    pendingAmount: number;
    successRate: number;
    completedCount: number;
    canceledCount: number;
    canceledAmount: number;
    totalTransactions: number;
    transactions: Array<{
        id: string;
        date: string;
        student: {
            id: string;
            name: string;
        } | null;
        teacher: {
            id: string;
            name: string;
        } | null;
        amount: number;
        status: string;
        provider: string;
    }>;
}

export interface PaymentResponse {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: PaymentStats;
}

export interface Teacher {
    price: number;
    lessonsCount: number;
    id: string;
    language: string;
    name: string;
    status: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    isActive: boolean;
    specification: string | null;
    level: string | null;
    description: string | null;
    hourPrice: number | null;
    portfolioLink: string | null;
    imageUrl: string;
    rating: string;
    experience: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface DeleteTeacher {
    reason: string;
}

export interface TeacherDeleteModalProps {
    teacher: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface Props {
    teacher: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isPending: boolean;
}

export const TEACHER_SPECIFICATIONS = {
    ENGLISH: "ENGLISH",
    RUSSIAN: "RUSSIAN",
    DEUTSCH: "DEUTSCH",
    SPANISH: "SPANISH",
    FRENCH: "FRENCH",
    ITALIAN: "ITALIAN",
    JAPANESE: "JAPANESE",
    CHINESE: "CHINESE",
    ARABIC: "ARABIC",
    KOREAN: "KOREAN",
} as const;

export const TEACHER_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export type SortField =
    | "name"
    | "email"
    | "rating"
    | "price"
    | "lessons"
    | "createdAt";
export type SortOrder = "asc" | "desc";
