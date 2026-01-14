import { useQuery } from "@tanstack/react-query";
import type { PaymentResponse } from "@/types";
import { request } from "@/config/request";

export const usePaymentStats = () => {
    return useQuery<PaymentResponse>({
        queryKey: ["payment-stats"],
        queryFn: () =>
            request.get("/transaction/stats").then((res) => res.data),
        refetchInterval: 30000,
    });
};
