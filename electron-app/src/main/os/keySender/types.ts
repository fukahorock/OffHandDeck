// OS差分（Cmd/Ctrlの読み替え等）を吸収するためのインターフェース。
// 実装はOSごとに分離する（mac.ts / windows.ts）。

export interface KeySender {
  /**
   * assignedKeys（内部共通キーコード表記、例: ["cmd", "s"]）を受け取り、
   * そのOS上でキー入力として送出する。
   */
  send(assignedKeys: string[]): Promise<void>;

  /**
   * 指定のキー組み合わせがOS予約済みショートカットと衝突するかを判定する
   * （バリデーション機能用）。判定基準はOSごとに異なる。
   */
  isReservedByOS(assignedKeys: string[]): boolean;
}
