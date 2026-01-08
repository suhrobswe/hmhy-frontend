import { useState } from "react";
import { usePaymentStats } from "./service/query/usePayment";
import {
    Clock,
    DollarSign,
    Download,
    Search,
    TrendingUp,
    XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const PaymentPage = () => {
    const { data, isLoading, isError } = usePaymentStats();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [providerFilter, setProviderFilter] = useState("all");

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-9 w-40 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-10 w-28 rounded-md" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="border-2">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-5 rounded" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-9 w-32 mb-2" />
                                <Skeleton className="h-3 w-28" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="border-2">
                    <CardHeader>
                        <Skeleton className="h-6 w-24" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Skeleton className="h-10 w-full md:col-span-2 rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2">
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4"
                                >
                                    <Skeleton className="h-10 w-24" />
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 w-28" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-16 rounded" />
                                    <Skeleton className="h-8 w-16 rounded-md" />
                                </div>
                            ))}
                        </div>
                        <Skeleton className="h-4 w-64 mx-auto mt-4" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Card className="max-w-md shadow-lg border-2">
                    <CardContent className="pt-6 text-center">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Ma'lumotlarni yuklashda xatolik
                        </h3>
                        <p className="text-gray-600">
                            Iltimos, qaytadan urinib ko'ring
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const stats = data.data;

    const filteredTransactions = stats.transactions.filter((t) => {
        const matchesSearch =
            searchQuery === "" ||
            t.student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.teacher?.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || t.status === statusFilter;
        const matchesProvider =
            providerFilter === "all" || t.provider === providerFilter;

        return matchesSearch && matchesStatus && matchesProvider;
    });

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            COMPLETED: {
                label: "Success",
                className: "bg-green-100 text-green-700 border-green-200",
            },
            PENDING: {
                label: "Pending",
                className: "bg-yellow-100 text-yellow-700 border-yellow-200",
            },
            CANCELLED: {
                label: "Canceled",
                className: "bg-red-100 text-red-700 border-red-200",
            },
            FAILED: {
                label: "Failed",
                className: "bg-gray-100 text-gray-700 border-gray-200",
            },
        };

        const config =
            statusConfig[status as keyof typeof statusConfig] ||
            statusConfig.PENDING;

        return (
            <Badge className={`${config.className} border`}>
                {config.label}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Payments
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage and monitor all payment transactions
                    </p>
                </div>
                <Button className="flex items-center gap-2 bg-black hover:bg-gray-800 cursor-pointer">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Revenue
                        </CardTitle>
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">
                            {stats.totalRevenue.toLocaleString()} so'm
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            {stats.completedCount} paid transactions
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-yellow-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Pending Payments
                        </CardTitle>
                        <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">
                            {stats.pendingAmount.toLocaleString()} so'm
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {stats.pendingPayments} pending
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Success Rate
                        </CardTitle>
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">
                            {stats.successRate}%
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {stats.completedCount} of {stats.totalTransactions}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-red-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Canceled
                        </CardTitle>
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-900">
                            {stats.canceledAmount.toLocaleString()} so'm
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {stats.canceledCount} canceled
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Search className="w-5 h-5 text-gray-700" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input
                            placeholder="Search by student, teacher, ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="md:col-span-2 border-gray-300"
                        />
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="border-gray-300">
                                <SelectValue placeholder="All States" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All States</SelectItem>
                                <SelectItem value="COMPLETED">
                                    Success
                                </SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="CANCELLED">
                                    Canceled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={providerFilter}
                            onValueChange={setProviderFilter}
                        >
                            <SelectTrigger className="border-gray-300">
                                <SelectValue placeholder="All Providers" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Providers
                                </SelectItem>
                                <SelectItem value="Click">Click</SelectItem>
                                <SelectItem value="Payme">Payme</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {(searchQuery ||
                        statusFilter !== "all" ||
                        providerFilter !== "all") && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 border-gray-300 hover:bg-gray-50"
                            onClick={() => {
                                setSearchQuery("");
                                setStatusFilter("all");
                                setProviderFilter("all");
                            }}
                        >
                            Reset Filters
                        </Button>
                    )}
                </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Transactions
                        <span className="ml-2 text-sm font-normal text-gray-500">
                            {filteredTransactions.length} total transactions
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredTransactions.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <XCircle className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">
                                No transactions found
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                Try adjusting your filters
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="font-semibold">
                                            Date
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Student
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Teacher
                                        </TableHead>
                                        <TableHead className="text-right font-semibold">
                                            Amount
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Status
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Provider
                                        </TableHead>
                                        <TableHead className="text-right font-semibold">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTransactions.map((transaction) => (
                                        <TableRow
                                            key={transaction.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <TableCell className="font-medium text-gray-900">
                                                {new Date(
                                                    transaction.date
                                                ).toLocaleDateString("uz-UZ")}
                                            </TableCell>
                                            <TableCell className="text-gray-700">
                                                {transaction.student?.name ||
                                                    "N/A"}
                                            </TableCell>
                                            <TableCell className="text-gray-700">
                                                {transaction.teacher?.name ||
                                                    "N/A"}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold text-gray-900">
                                                {Number(
                                                    transaction.amount
                                                ).toLocaleString()}{" "}
                                                so'm
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(
                                                    transaction.status
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className="border-gray-300"
                                                >
                                                    {transaction.provider}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:bg-gray-100"
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500 text-center">
                        Showing 0 to {filteredTransactions.length} of{" "}
                        {stats.totalTransactions} results
                        <span className="ml-4 font-medium">
                            Show: 20 per page
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
