/**
 * このファイルはvite経由で「renderer」コンテキストで実行される。
 * main/renderer の違いについては https://electronjs.org/docs/tutorial/process-model を参照。
 */

import './index.css';
// ./renderer/window.d.ts はグローバル型拡張のみを持つ型定義ファイルのため、
// importは不要（tsconfigのデフォルトincludeでプロジェクトに含まれ、型チェック時に自動的に適用される）。

// OS抽象化レイヤー（キー送出・権限・フロントアプリ検知）が
// preload経由で正しく配線されているかを確認するためのスモークテストパネル。
// 判定ロジック・本来のUIはこれから移植する（現時点ではダミー表示）。
async function renderSmokeTest() {
  const container = document.getElementById('smoke-test');
  if (!container) return;

  container.innerHTML = `
    <fieldset>
      <legend>OS抽象化レイヤー スモークテスト</legend>
      <p>アクセシビリティ権限: <span id="a11y-status">確認中...</span></p>
      <button id="request-a11y">権限をリクエスト</button>
      <p>最前面アプリ: <span id="front-app">確認中...</span></p>
    </fieldset>
  `;

  const a11yStatus = document.getElementById('a11y-status')!;
  const frontApp = document.getElementById('front-app')!;
  const requestBtn = document.getElementById('request-a11y')!;

  const hasPermission = await window.offHandDeck.permissions.hasAccessibilityPermission();
  a11yStatus.textContent = hasPermission ? '許可済み' : '未許可';

  requestBtn.addEventListener('click', async () => {
    const granted = await window.offHandDeck.permissions.requestAccessibilityPermission();
    a11yStatus.textContent = granted ? '許可済み' : '未許可（システム設定で許可してください）';
  });

  const frontmostId = await window.offHandDeck.frontApp.getFrontmostAppId();
  frontApp.textContent = frontmostId ?? '取得できませんでした';
}

renderSmokeTest();
