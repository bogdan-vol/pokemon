import { createQueryString } from "@/lib/pokemon.utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParamFilter = (searchParamName: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addSearchParam = (paramValue: string) =>
    router.push(
      pathname +
        "?" +
        createQueryString(searchParams, searchParamName, paramValue)
    );

  const getCurrentPageSearchParam = () =>
    parseInt(searchParams.get("page") || "1");

  const getSearchSearchParam = () => searchParams.get("search") || "";

  const getTypeSearchParam = () => searchParams.get("type") || "";

  return {
    addSearchParam,
    getCurrentPageSearchParam,
    getSearchSearchParam,
    getTypeSearchParam,
  };
};
