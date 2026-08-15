import type { KeySender } from './types';

// Windows対応は後回し（開発ステップ④）。インターフェースだけ先に用意しておく。
// 実装時の注意点（仕様書「OS抽象化境界」より）：
// - Ctrlキーの読み替え（Mac版のcmdに相当）
// - OS予約済みショートカットの判定基準はMacと異なる
// - UIPI/管理者権限で起動したウィンドウへのキー送出制限はWindows実機でしか検証できない
export const windowsKeySender: KeySender = {
  async send(): Promise<void> {
    throw new Error('Windows版のキー送出は未実装です（Mac版先行のため）');
  },

  isReservedByOS(): boolean {
    throw new Error('Windows版のOS予約済みショートカット判定は未実装です（Mac版先行のため）');
  },
};
