import React, { useEffect } from "react";
import cls from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";
import Head from "next/head";

import { CATEGORIES } from "@/data/schema";

const inter = Inter({ subsets: ["latin"] });

const Heading1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="mb-4 text-3xl md:text-6xl">{children}</h1>;
};

const Heading2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="mb-3 text-2xl capitalize md:text-3xl">{children}</h2>;
};

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm md:text-base">{children}</p>;
};

export default function Home() {
  const [categories, setCategories] = React.useState<
    { category: string; description: string }[]
  >([]);
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

  // swr いれるのもめんどうなので useEffect で許してくれ
  useEffect(() => {
    fetch(`/api/c`)
      .then((res) => res.json())
      .then((w) => setCategories(w));
  }, []);

  return (
    <>
      <Head>
        <title>uNekoBlockList - uBlackList Subscription for Developers</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="description"
          content="A community-managed blacklist for uBlackList targeting engineers and developers."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@6jz" />
        <meta name="twitter:creator" content="@6jz" />
        <meta
          property="og:title"
          content="uNekoBlockList - uBlackList Subscription for Developers"
        />
        <meta
          property="og:description"
          content="A community-managed blacklist for uBlackList targeting engineers and developers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:site_name"
          content="uNekoBlockList - uBlackList Subscription for Developers"
        />
      </Head>
      <main
        className={`container mx-auto flex min-h-screen flex-col items-center p-12 sm:p-16 md:p-24 ${inter.className}`}
      >
        <div className="relative w-full max-w-full place-items-center md:flex md:flex-col md:before:absolute md:before:h-[300px] md:before:w-[480px] md:before:-translate-x-1/2 md:before:rounded-full md:before:bg-gradient-radial md:before:from-white md:before:to-transparent md:before:blur-2xl md:before:content-[''] md:after:absolute md:after:-z-20 md:after:h-[180px] md:after:w-[240px] md:after:translate-x-1/3 md:after:bg-gradient-conic md:after:from-sky-200 md:after:via-blue-200 md:after:blur-2xl md:after:content-[''] md:before:dark:bg-gradient-to-br md:before:dark:from-transparent md:before:dark:to-blue-700/10 md:after:dark:from-sky-900 md:after:dark:via-[#0141ff]/40">
          <div className="relative text-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
            <Heading1>block.natsuneko.cat</Heading1>
            <Paragraph>
              A community-managed blacklist for{" "}
              <a
                href="https://github.com/iorate/ublacklist"
                target="_blank"
                rel="noopener noreferrer"
              >
                uBlackList
              </a>{" "}
              targeting engineers and developers. You can search for the reasons
              behind all the content through the following form.
            </Paragraph>
          </div>
          <div className="z-10 w-full max-w-full">
            <form className="mt-8 flex max-w-full place-items-center">
              <input
                type="text"
                className="h-10 min-w-0 flex-grow appearance-none rounded-sm px-2 text-lg text-black outline-none md:h-12 md:text-2xl"
                name="domain"
                placeholder="natsuneko.cat"
                defaultValue={domain}
                onChange={onChangeDomain}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="ml-2 h-10 w-20 rounded-sm bg-white text-lg text-black disabled:opacity-50 md:ml-4 md:h-12 md:w-36 md:text-2xl"
                onClick={onCheckDomain}
                disabled={isLoading}
              >
                Check
              </button>
            </form>
            {item && (
              <div className="mt-4 w-full max-w-full text-left text-sm  md:text-base">
                {domain} is{" "}
                {item.category !== "unknown" ? (
                  <span className="text-red-400">listed</span>
                ) : (
                  <span className="text-green-500">unlisted</span>
                )}
                .
                {item.category !== "unknown" && (
                  <p>Category: {item.category}</p>
                )}
                {item.reasons.length > 0 && (
                  <div className="w-full max-w-full overflow-hidden">
                    Reasons:
                    <ol className="mt-1 list-inside list-decimal md:pl-4">
                      {item.reasons.map((w) => {
                        return (
                          <li
                            className="overflow-hidden text-ellipsis whitespace-nowrap"
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
        <div className="mt-16 grid grid-cols-[repeat(12,1fr)] flex-col gap-x-6 gap-y-12 text-center md:mb-0 xl:text-left">
          {categories.length > 0 ? (
            categories.map((w, i) => {
              const isFirstRemainderIdx = {
                md: Math.floor(categories.length / 2) * 2 + 1,
                lg: Math.floor(categories.length / 3) * 3 + 1,
                xl: Math.floor(categories.length / 4) * 4 + 1,
              };

              return (
                <div
                  key={w.category}
                  className={twMerge(
                    cls(
                      "col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3",
                      isFirstRemainderIdx.md == i + 1 && "md:col-[_4/span_6]",
                      isFirstRemainderIdx.lg == i + 1 && "lg:col-[_5/span_4]",
                      isFirstRemainderIdx.xl <= i + 1 &&
                        "xl:col-[span_4/span_4]"
                    )
                  )}
                >
                  <Heading2>{w.category}</Heading2>
                  <Paragraph>{w.description}</Paragraph>
                  <a
                    href={`/${w.category.toLowerCase()}.txt`}
                    className="text-sm underline md:text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe
                  </a>
                </div>
              );
            })
          ) : (
            <>loading...</>
          )}
        </div>
      </main>
    </>
  );
}
