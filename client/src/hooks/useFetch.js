import { useEffect, useState } from "react";

export const useFetch = (fetcher) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const result = await fetcher();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [fetcher]);
    return { data, isLoading, error };
};
