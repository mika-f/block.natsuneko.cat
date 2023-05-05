const CATEGORIES = [
  "affiliate", // アフィリエイトサイト
  "curation", // キュレーションサイト
  "machine-translation", // 機械翻訳転載サイト
  "meta", // メタ情報
  "news", // ニュースサイト
  "spammer", // スパムサイト
  "username", // ユーザー投稿型サイト
] as const;

type Category = (typeof CATEGORIES)[number];

type Content = {
  category: Category;
  reasons: string[];
};

type Schema = {
  blockings: {
    [key: string]: Content;
  };
};

// prettier-ignore
const DESCRIPTIONS: { [k in Category]: string } = {
  affiliate: "A list that includes affiliate websites designed to redirect traffic to own website and technical articles promoting own products.",
  curation: "A list that includes curation that reprints articles and/or contents from the source website.",
  "machine-translation": "A list that includes mechanically and/or manually translated and reprinted articles and/or contents from the source website such as StackOverflow.",
  meta: "A list that includes sites where third parties add comments or other content to the source website, except some message boards like Reddit.",
  news: "A list of news sites that contains politically biased and/or scientifically inaccurate articles and/or have a history of disseminating misinformation or fake news. Evidence is available for all relevant articles in the past.",
  spammer: "A list that includes spam, scam, phishing or extremely unreliable website. For example, sites that somehow distribute Windows Kernel DLLs, copies of shopping sites, and others.",
  username: "A list of usernames that includes accounts selling low-quality information products or resale items for personal gain, accounts sharing scientifically unsupported information, and accounts promoting news with exaggerated advertising. This list targets services primarily used in Japan, such as Twitter, Qiita, and Zenn.",
};

export { CATEGORIES, DESCRIPTIONS };

export type { Schema };
