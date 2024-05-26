import { usePathname, useRouter, useSearchParams } from "next/navigation";

const createQueryString = (
  searchParams: string,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
};

export const useSearchParamFilter = (searchParamName: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const resetSearchParam = (resetParams?: ("search" | "type")[]) => {
    let resetSearchParams = searchParams.toString();
    resetParams?.forEach((rp) => {
      let paramValue = resetSearchParams.split(rp)[1];
      if (paramValue) paramValue = paramValue.split("&")[0];
      resetSearchParams = resetSearchParams.replaceAll(
        `${rp}${paramValue}`,
        ""
      );
    });
    return resetSearchParams;
  };

  const addSearchParam = (
    paramValue: string,
    resetParams?: ("search" | "type")[]
  ) => {
    let pathWithSearchParams =
      pathname +
      "?" +
      createQueryString(
        resetSearchParam(resetParams),
        searchParamName,
        paramValue
      );
    router.push(pathWithSearchParams);
  };

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
