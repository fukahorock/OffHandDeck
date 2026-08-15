// アクセシビリティ権限（キー送出に必須）まわりのインターフェース。
// Windows版では基本的に不要なため、この存在自体がMac固有処理であることを示す境界になっている。

export interface PermissionsChecker {
  /** 現在アクセシビリティ権限が許可されているかを確認する（プロンプトは出さない） */
  hasAccessibilityPermission(): boolean;

  /**
   * アクセシビリティ権限が無ければ、システム設定を開くよう促すダイアログを表示する。
   * 初期設定ウィザード内の適切なタイミング（キー送出のテスト直前等）で呼び出す想定。
   */
  requestAccessibilityPermission(): boolean;
}
