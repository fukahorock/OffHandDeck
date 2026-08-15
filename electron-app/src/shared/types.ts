// 仕様書「データ構造」セクション準拠の型定義。
// メイン/レンダラー両方から参照する（IPC経由でのやり取りにもこの型を使う）。

export interface PoseTemplate {
  angleLabel: string;
  landmarks: Array<{ x: number; y: number; z: number }>; // 21点分
}

export interface Pose {
  id: string;
  fingerPattern: { thumb: boolean; otherCount: number };
  templates: PoseTemplate[]; // 未キャリブレーション時は空配列。キャリブレーション後は自動選出された代表サンプル（最大8件）
  threshold: number; // キャリブレーション時に自動算出
  thresholdAdjustment: number; // 手動微調整オフセット（デフォルト0）
  calibratedAt: string | null; // キャリブレーション日時（再利用ダイアログ表示用）
  recommended: boolean; // デフォルト推奨/非推奨フラグ（親指のみ・他指3本・他指4本はfalse）
  holdDurationMs: number | null; // ポーズ単位の保持確定時間の上書き。nullならグローバルデフォルト（1000〜1500ms）を使用
  repeatIntervalMs: number | null; // ポーズ単位の連射間隔の上書き。nullならShortcut.autoRepeatIntervalMsを使用
}

export interface Shortcut {
  id: string;
  order: number;
  poseId: string; // Poseへの参照のみ。Shortcut削除してもPoseは残る
  assignedKeys: string[]; // 例: ["cmd", "s"]（内部共通キーコード表記）
  autoRepeat: boolean; // 保持中の連続発火。デフォルトfalse
  autoRepeatIntervalMs: number; // ON時の再発火間隔（初回確定の保持時間とは別。目安1000〜数千ms）
}

export interface Preset {
  id: string;
  appBundleId: string; // 対応するフロントアプリの識別子
  shortcuts: Shortcut[];
}

export interface Situation {
  label: string; // 例: "タイピング中"
  riskyPoses: string[]; // 誤発火しやすいと判定されたPoseIdのリスト
}

export interface UserSettings {
  handedness: 'right' | 'left';
  palmSide: 'palm' | 'back'; // 初期設定ウィザードで判定。裏表どちらを基準に判定するか
  palmOrientationCheckEnabled: boolean; // 手のひら向きチェックのON/OFF（デフォルトfalse）
  situations: Situation[]; // 初期設定ウィザードで選択したシチュエーション
}

export interface AppState {
  userSettings: UserSettings;
  poses: Pose[]; // 9つ分の枠が常に存在する
  shortcuts: Shortcut[];
  presets: Preset[];
}
