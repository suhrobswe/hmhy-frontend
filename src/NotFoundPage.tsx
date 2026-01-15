import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-6 font-sans">
            <div className="max-w-lg w-full text-center">
                <div className="relative">
                    <h1 className="text-9xl font-black text-shadow-black select-none">
                        404
                    </h1>
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-800 w-full">
                        Sahifa topilmadi
                    </p>
                </div>

                <div className="mt-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                        Mavjud bo'lmagan sahifaga kirib qoldingiz!
                    </h2>
                    <p className="text-gray-600 mb-10 leading-relaxed">
                        Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga
                        ko'chirilgan. Pastdagi tugma orqali davom etishingiz
                        mumkin.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 cursor-pointer bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                        >
                            ← Orqaga qaytish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
