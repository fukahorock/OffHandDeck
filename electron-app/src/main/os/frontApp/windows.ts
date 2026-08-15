import type { FrontAppDetector } from './types';

// Windows対応は後回し（開発ステップ④）。フロントアプリ検知はOSごとにAPIが全く異なる領域。
export const windowsFrontAppDetector: FrontAppDetector = {
  async getFrontmostAppId(): Promise<string | null> {
    throw new Error('Windows版のフロントアプリ検知は未実装です（Mac版先行のため）');
  },
};
