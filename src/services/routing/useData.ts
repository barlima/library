import { useLoaderData } from "react-router-dom";

export const useData = <T>(): T => {
  const data = useLoaderData();
  return data as T;
};
