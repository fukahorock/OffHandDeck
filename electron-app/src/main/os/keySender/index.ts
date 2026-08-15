import type { KeySender } from './types';
import { macKeySender } from './mac';
import { windowsKeySender } from './windows';

// OSごとの実装を切り替える境界。呼び出し側はprocess.platformを意識しなくてよい。
export function getKeySender(): KeySender {
  switch (process.platform) {
    case 'darwin':
      return macKeySender;
    case 'win32':
      return windowsKeySender;
    default:
      throw new Error(`未対応のOSです: ${process.platform}`);
  }
}

export type { KeySender } from './types';
