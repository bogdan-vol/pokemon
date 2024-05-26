import { createQueryString } from "@/lib/pokemon.utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParamFilter = (searchParamName: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (paramValue: string) =>
    router.push(
      pathname +
        "?" +
        createQueryString(searchParams, searchParamName, paramValue)
    );
};
