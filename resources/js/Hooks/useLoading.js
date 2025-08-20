import { useState } from "react";

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

    const startLoading = (message = "Loading...") => {
        setLoadingMessage(message);
        setIsLoading(true);
    };

    const stopLoading = () => {
        setIsLoading(false);
        setLoadingMessage("Loading...");
    };

    return {
        isLoading,
        loadingMessage,
        startLoading,
        stopLoading,
    };
};

export default useLoading;
