import React from "react";

import { Inter } from "next/font/google";
import {
  CATEGORIES,
  CENTER_IDX,
  DESCRIPTIONS,
  LAST_CHILD,
} from "@/data/schema";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [domain, setDomain] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [item, setItem] = React.useState<{
    domain: string;
    category: string;
    reasons: string[];
  } | null>(null);

  const onChangeDomain = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);

    if (item && item.domain !== e.target.value) {
      setItem(null);
    }
  };

  const onCheckDomain = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);

    const res = await fetch(`/api/check?domain=${domain}`);
    const data = await res.json();
    setItem(data);

    setIsLoading(false);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <div className="text-center relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
          <h1 className="text-6xl mb-4">block.natsuneko.cat</h1>
          <p>
            A community-managed blacklist for{" "}
            <a
              href="https://github.com/iorate/ublacklist"
              target="_blank"
              rel="noopener noreferrer"
            >
              uBlackList
            </a>{" "}
            targeting engineers and developers.
            <br />
            You can search for the reasons behind all the content through the
            following form.
          </p>
          <form className="mt-8 flex place-items-center">
            <input
              type="text"
              className="flex-grow h-12 text-black text-2xl px-2 rounded-sm appearance-none outline-none"
              name="domain"
              placeholder="natsuneko.cat"
              defaultValue={domain}
              onChange={onChangeDomain}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="h-12 w-36 ml-4 bg-white text-black rounded-sm text-2xl disabled:opacity-50"
              onClick={onCheckDomain}
              disabled={isLoading}
            >
              Check
            </button>
          </form>
          {item && (
            <div className="mt-4 w-full text-left max-w-[628px]">
              {domain} is{" "}
              {item.category !== "unknown" ? (
                <span className="text-red-400">listed</span>
              ) : (
                <span className="text-green-500">unlisted</span>
              )}
              .{item.category !== "unknown" && <p>Category: {item.category}</p>}
              {item.reasons.length > 0 && (
                <div className="w-full overflow-hidden">
                  Reasons:
                  <ol className="list-inside pl-4 list-decimal mt-1">
                    {item.reasons.map((w) => {
                      return (
                        <li
                          className="text-ellipsis whitespace-nowrap overflow-hidden"
                          key={w}
                        >
                          {w}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mb-32 mt-16 grid text-center gap-y-6 lg:mb-0 xl:grid-cols-[repeat(8,1fr)] xl:grid-rows-2 xl:gap-x-4 xl:text-left">
        {CATEGORIES.map((w) => {
          return (
            <div
              key={w}
              className={`col-span-2 xl:[&:nth-child(${LAST_CHILD})]:col-[${CENTER_IDX}_/_span_2]`}
            >
              <h3 className="text-3xl mb-2 capitalize">{w}</h3>
              <p className="text-neutral-200 my-2">{DESCRIPTIONS[w]}</p>
              <a
                href={`/${w}.txt`}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe
              </a>
            </div>
          );
        })}
      </div>
    </main>
  );
}
