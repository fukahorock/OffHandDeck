# OffHandDeck（Electron雛形）

液タブでの作業中、ペンを持たない方の手の指ポーズでPCショートカットを実行するアプリケーション。
仕様書 v2.7 に基づくElectronプロジェクトの雛形。

## Macでのセットアップ

必要なものはこれだけです。

1. **Node.js（v22以降）** — [nodejs.org](https://nodejs.org) から公式インストーラーで入れる（Homebrew不要）
2. **Xcode Command Line Tools** — nut.js（ネイティブモジュール）のビルドに必要。大抵のMacには入っている。無ければ `npm install` 実行時に自動でインストールを促される

```bash
cd electron-app
npm install
npm start
```

`npm install` はこのMac上で改めて実行してください（nut.jsのネイティブバインディングをこの環境向けに再ビルドするため）。

## 現状（雛形段階）

- Electron Forge（Vite + TypeScript テンプレート）で作成
- `npm start` で起動すると、OS抽象化レイヤーのスモークテスト画面が表示される
  - アクセシビリティ権限の確認・リクエスト
  - 最前面アプリのbundle identifier取得
- 判定ロジック・本来のUI（`hand-gesture-test.html` の内容）はまだ移植していない

## 構成

```
src/
  main.ts                  # メインプロセスのエントリーポイント、IPCハンドラ登録
  preload.ts                # レンダラーに安全なAPIを公開するブリッジ
  renderer.ts               # レンダラーのエントリーポイント（現状はスモークテストのみ）
  main/os/                  # OS差分を吸収する抽象化レイヤー
    keySender/               # キー送出（nut.js、Mac実装のみ・Windowsはスタブ）
    permissions/              # アクセシビリティ権限（Electron systemPreferences使用、Mac固有）
    frontApp/                 # フロントアプリ検知（osascript、Mac実装のみ・Windowsはスタブ）
  shared/types.ts            # 仕様書のPose/Shortcut/Preset/UserSettings型定義
```

## 準備段階の調査からの重要な訂正

キー送出ライブラリは `@nut-tree-fork/nut-js`（有志フォーク、無償）を採用。

準備検討時点では「nut.jsの新しい権限API（`hasAccessibilityPermission()` 等）が使える」という想定だったが、
これは**有償の本家パッケージ（`@nut-tree/nut-js`、公開npmレジストリには存在しない）向けの機能**で、
無償フォーク（現時点で最新4.2.6）にはまだ含まれていないことが判明した。

代わりに、Electron本体が提供する `systemPreferences.isTrustedAccessibilityClient()` を使う設計に変更した
（`src/main/os/permissions/mac.ts`）。これはMac専用のElectron標準APIで、nut.jsに依存しない。

## 未実装・今後の作業

- 判定ロジック（MediaPipe Hands＋ポーズ判定）のTypeScript移植
- キャリブレーション・初期設定ウィザードのUI移植
- データ永続化のファイル化（IPC経由でメインプロセスがJSON書き出し）
- キー入力待ち画面（ショートカット登録フロー）
- トレイ（メニューバー）常駐
- Windows版の各実装（`windows.ts` はスタブのみ）
