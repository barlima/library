import { useEffect, useState } from "react";

export const useFetch = <T>(
  endpointUrl: string,
  filter?: (data: T[]) => T[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      setData(responseJson);
    } catch (e) {
      console.log("Unable to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(endpointUrl);
  }, [endpointUrl]);

  return { data: filter ? filter(data) : data, loading };
};
