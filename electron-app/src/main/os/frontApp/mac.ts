import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import type { FrontAppDetector } from './types';

const execAsync = promisify(exec);

// 追加のネイティブ依存を増やさないため、macOS標準のosascript（AppleScript実行コマンド）を使う。
// 初回実行時にはSystem Eventsへのオートメーション権限リクエストがOS標準ダイアログで表示される
// （アクセシビリティ権限とは別の権限）。
const SCRIPT = `
tell application "System Events"
  set frontApp to first application process whose frontmost is true
  return bundle identifier of frontApp
end tell
`;

export const macFrontAppDetector: FrontAppDetector = {
  async getFrontmostAppId(): Promise<string | null> {
    try {
      const { stdout } = await execAsync(`osascript -e '${SCRIPT}'`);
      const bundleId = stdout.trim();
      return bundleId.length > 0 ? bundleId : null;
    } catch {
      return null;
    }
  },
};
