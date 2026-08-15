// フロントアプリ（今一番手前のアプリ）検知のインターフェース。
// OSごとにAPIが全く異なる領域のため、インターフェースだけ先に決めてMac版から実装する。

export interface FrontAppDetector {
  /** 現在最前面のアプリのbundle identifier（Windowsの場合は実行ファイル名等）を取得する */
  getFrontmostAppId(): Promise<string | null>;
}
