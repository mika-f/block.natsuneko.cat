type Category =
  | "affiliate" // アフィリエイトサイト
  | "curation" // キュレーションサイト
  | "machine-translation" // 機械翻訳転載サイト
  | "meta" // メタ情報
  | "news" // ニュースサイト
  | "username"; // ユーザー投稿型サイト

type Content = {
  category: Category;
  reasons: string[];
};

type Schema = {
  blockings: {
    [key: string]: Content;
  };
};

export type { Schema };
