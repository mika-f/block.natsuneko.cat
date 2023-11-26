const CATEGORIES = [
  "affiliate", // アフィリエイトサイト
  "curation", // キュレーションサイト or まとめサイト
  "machine-translation", // 機械翻訳転載サイト
  "meta", // メタ情報
  "news", // ニュースサイト
  "spammer", // スパムサイト
  "username", // ユーザー投稿型サイト
] as const;

const LEVELS = [
  "strict", // 過激めな設定
  "basic", // インターネットする上でやっておくと快適
  "casual", // 全ユーザーにお勧め
] as const;

type Level = (typeof LEVELS)[number];

type Content = {
  level: Level;
  reasons: string[];
};

type Schema = {
  name: string;
  description: string;
  items: {
    [key: string]: Content;
  };
};

export { CATEGORIES };

export type { Schema };
