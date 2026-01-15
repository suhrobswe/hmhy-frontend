import { useQuery } from "@tanstack/react-query";
import { request } from "@/config/request";

export const usePaymentStats = () => {
    return useQuery({
        queryKey: ["payment-stats"],
        queryFn: () =>
            request.get("/transaction/stats").then((res) => res.data),
        refetchInterval: 30000,
    });
};
