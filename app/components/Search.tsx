"use client";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  useTransition,
} from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import path from "path";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const [inputVal, setInputVal] = useState("");

  const router = useRouter();

  const OnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`?city=${inputVal}`);
    router.refresh();
    //create(inputVal);
  };

  return (
    <>
      <form>
        <input type="text" onChange={(e) => setInputVal(e.target.value)} />
        <button type="submit" onClick={OnClick}>
          click
        </button>
      </form>
    </>
  );
};

export default Search;
