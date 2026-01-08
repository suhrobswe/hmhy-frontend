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

export type SortField = "username" | "createdDate" | "updatedDate";
export type SortOrder = "asc" | "desc";

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

// 2. Ko'p tilli xabarlar uchun interfeys
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
    data: Admin[]; // Bu yerda massiv bo'lishi shart
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
