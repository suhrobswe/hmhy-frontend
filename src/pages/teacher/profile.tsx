import { useState } from "react";
import {
    User,
    Phone,
    Briefcase,
    Star,
    DollarSign,
    CreditCard,
    Languages,
    FileText,
    Edit3,
    Lock,
    Loader2,
    Save,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useProfile } from "./service/useProfile";
import { useChangePassword, useEditProfile } from "./service/useTeacherEdit";
import { TEACHER_SPECIFICATIONS } from "@/types/admin-type";

type SpecificationType = keyof typeof TEACHER_SPECIFICATIONS;

export const TeacherProfile = () => {
    const { data, isLoading, error, refetch } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [editedData, setEditedData] = useState({
        fullName: "",
        phoneNumber: "",
        experience: "",
        level: "",
        hourPrice: "",
        cardNumber: "",
        specification: "" as SpecificationType | "",
        description: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const profile = data?.data;

    const { mutate: updateProfile, isPending: isUpdating } = useEditProfile();
    const { mutate: changePassword, isPending: isChangingPass } =
        useChangePassword();

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="p-8 text-center text-red-500 font-medium">
                Profil ma'lumotlarini yuklashda xatolik yuz berdi.
            </div>
        );
    }

    const handleEditClick = () => {
        setEditedData({
            fullName: profile.fullName || "",
            phoneNumber: profile.phoneNumber || "",
            experience: profile.experience || "",
            level: profile.level || "",
            hourPrice: profile.hourPrice?.toString() || "",
            cardNumber: profile.cardNumber || "",
            specification: (profile.specification as SpecificationType) || "",
            description: profile.description || "",
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsChangingPassword(false);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleSaveProfile = () => {
        const payload: any = {
            fullName: editedData.fullName,
            phoneNumber: editedData.phoneNumber,
            experience: editedData.experience,
            level: editedData.level,
            hourPrice: editedData.hourPrice
                ? Number(editedData.hourPrice)
                : undefined,
            cardNumber: editedData.cardNumber,
            specification: editedData.specification || undefined,
            description: editedData.description,
        };

        Object.keys(payload).forEach((key) => {
            if (payload[key] === "" || payload[key] === null) {
                delete payload[key];
            }
        });

        updateProfile(payload, {
            onSuccess: () => {
                toast.success("Profil muvaffaqiyatli yangilandi!");
                setIsEditing(false);
                refetch();
            },
            onError: (err: any) => {
                const message = err?.response?.data?.message;
                toast.error(
                    Array.isArray(message)
                        ? message[0]
                        : message || "Xatolik yuz berdi"
                );
            },
        });
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Yangi parollar mos kelmadi!");
            return;
        }
        changePassword(
            {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            },
            {
                onSuccess: () => {
                    toast.success("Parol o'zgartirildi!");
                    handleCancel();
                },
                onError: (err: any) => {
                    toast.error(
                        err?.response?.data?.message ||
                            "Parol o'zgartirishda xatolik"
                    );
                },
            }
        );
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Profile
                    </h1>
                    {!isEditing && !isChangingPassword && (
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={handleEditClick}
                                className="bg-white border-gray-300 text-black hover:bg-slate-50"
                            >
                                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsChangingPassword(true)}
                                className="bg-white border-gray-300 text-black hover:bg-slate-50"
                            >
                                <Lock className="mr-2 h-4 w-4" /> Change
                                Password
                            </Button>
                        </div>
                    )}
                </div>

                <Card className="overflow-hidden border-none shadow-sm bg-white">
                    <div className="h-24 w-full bg-linear-to-r from-slate-100 to-slate-200" />
                    <div className="px-8 pb-6">
                        <div className="relative -top-12 flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                <AvatarImage src={profile?.imageUrl} />
                                <AvatarFallback className="bg-slate-200 text-xl font-bold">
                                    {profile?.fullName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="mt-4 sm:mt-0 text-center sm:text-left pb-2">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {profile?.fullName}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {profile?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {isChangingPassword ? (
                    <Card className="border-none shadow-sm p-8 bg-white">
                        <div className="flex items-center gap-2 mb-8">
                            <Lock className="h-5 w-5 text-gray-700" />
                            <h2 className="text-lg font-semibold">
                                Change Password
                            </h2>
                        </div>
                        <div className="space-y-4 max-w-md">
                            <div className="space-y-2">
                                <Label>Current Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Confirm New Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={handlePasswordChange}
                                    disabled={isChangingPass}
                                    className="bg-black text-white hover:bg-gray-800"
                                >
                                    {isChangingPass ? (
                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                    ) : (
                                        <Lock className="h-4 w-4 mr-2" />
                                    )}
                                    Update Password
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card className="border-none shadow-sm bg-white">
                        <CardHeader className="border-b bg-slate-50/50 py-4">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-slate-500" />
                                <CardTitle className="text-lg font-semibold">
                                    Profile Information
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-6 p-8 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                                    <User className="mr-2 h-3.5 w-3.5" /> FULL
                                    NAME
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedData.fullName}
                                        onChange={(e) =>
                                            setEditedData({
                                                ...editedData,
                                                fullName: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                                        {profile?.fullName || "Not set"}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                                    <Phone className="mr-2 h-3.5 w-3.5" /> PHONE
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedData.phoneNumber}
                                        onChange={(e) =>
                                            setEditedData({
                                                ...editedData,
                                                phoneNumber: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                                        {profile?.phoneNumber || "Not set"}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                                    <Languages className="mr-2 h-3.5 w-3.5" />{" "}
                                    TEACHING LANGUAGE
                                </Label>
                                {isEditing ? (
                                    <Select
                                        value={editedData.specification}
                                        onValueChange={(
                                            val: SpecificationType
                                        ) =>
                                            setEditedData({
                                                ...editedData,
                                                specification: val,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(
                                                TEACHER_SPECIFICATIONS
                                            ).map((lang) => (
                                                <SelectItem
                                                    key={lang}
                                                    value={lang}
                                                >
                                                    {lang}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                                        {profile?.specification || "Not set"}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                                    <Briefcase className="mr-2 h-3.5 w-3.5" />{" "}
                                    EXPERIENCE
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedData.experience}
                                        onChange={(e) =>
                                            setEditedData({
                                                ...editedData,
                                                experience: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                                        {profile?.experience || "Not set"}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                                    <Star className="mr-2 h-3.5 w-3.5" /> LEVEL
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedData.level}
                                        onChange={(e) =>
                                            setEditedData({
                                                ...editedData,
                                                level: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                                        {profile?.level || "Not set"}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                                    <DollarSign className="mr-2 h-3.5 w-3.5" />{" "}
                                    HOUR PRICE (UZS)
                                </Label>
                                {isEditing ? (
                                    <Input
                                        type="number"
                                        value={editedData.hourPrice}
                                        onChange={(e) =>
                                            setEditedData({
                                                ...editedData,
                                                hourPrice: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                                        {profile?.hourPrice
                                            ? `${profile.hourPrice.toLocaleString()} UZS`
                                            : "Not set"}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                                    <CreditCard className="mr-2 h-3.5 w-3.5" />{" "}
                                    CARD NUMBER
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedData.cardNumber}
                                        onChange={(e) =>
                                            setEditedData({
                                                ...editedData,
                                                cardNumber: e.target.value,
                                            })
                                        }
                                        maxLength={16}
                                    />
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                                        {profile?.cardNumber || "Not set"}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                                    <FileText className="mr-2 h-3.5 w-3.5" />{" "}
                                    BIO
                                </Label>
                                {isEditing ? (
                                    <textarea
                                        className="flex min-h-24 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                                        value={editedData.description}
                                        onChange={(e) =>
                                            setEditedData({
                                                ...editedData,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <div className="min-h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                        {profile?.description || "No bio added"}
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <div className="flex items-center gap-3 pt-4 md:col-span-2 border-t">
                                    <Button
                                        onClick={handleSaveProfile}
                                        disabled={isUpdating}
                                        className="bg-black text-white hover:bg-gray-800"
                                    >
                                        {isUpdating ? (
                                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                        ) : (
                                            <Save className="h-4 w-4 mr-2" />
                                        )}
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={isUpdating}
                                    >
                                        <X className="h-4 w-4 mr-2" /> Cancel
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};
