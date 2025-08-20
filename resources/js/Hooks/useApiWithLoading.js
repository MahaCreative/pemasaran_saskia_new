import { useLoading } from "./useLoading";
import ResponseAlert from "@/Hooks/ResponseAlert";

export const useApiWithLoading = () => {
    const { startLoading, stopLoading } = useLoading();
    const { showResponse } = ResponseAlert();

    const executeWithLoading = async (
        apiCall,
        successMessage,
        loadingMessage = "Processing..."
    ) => {
        startLoading(loadingMessage);

        try {
            const result = await apiCall();
            if (successMessage) {
                showResponse("success", "Success!", successMessage);
            }
            return result;
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "An error occurred";
            showResponse("error", "Error!", errorMessage);
            throw error;
        } finally {
            stopLoading();
        }
    };

    return {
        executeWithLoading,
    };
};

export default useApiWithLoading;
