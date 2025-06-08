"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const SearchInputNotes = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSubjectId = searchParams?.get("subjectId");

  // Sync the input with the "title" query param on load, if it exists
  useEffect(() => {
    const initialTitle = searchParams?.get("title") || "";
    setValue(initialTitle);
  }, [searchParams]);

  useEffect(() => {
    if (!pathname) return; // Avoid running if pathname is undefined

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          subjectId: currentSubjectId,
          title: debouncedValue || undefined, // Skip empty title
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, currentSubjectId]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 " />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[400px] pl-9 rounded-full"
        placeholder="Search for a subject..."
      />
    </div>
  );
};
