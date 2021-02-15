import { useEffect, useState } from "react";

export const useGetCollection = (id) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState({});

    const url = `${process.env.REACT_APP_API_URL}/collections/${id}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if (res.status !== 200) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setData(await res.json());
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(true);
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return [data, loading, error];
};

export default useGetCollection;
