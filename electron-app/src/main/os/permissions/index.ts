import type { PermissionsChecker } from './types';
import { macPermissionsChecker } from './mac';

// Windows版では権限リクエストの概念自体が基本的に不要。
// nullを返し、呼び出し側で「このOSでは権限チェック不要」と扱えるようにする。
export function getPermissionsChecker(): PermissionsChecker | null {
  if (process.platform === 'darwin') {
    return macPermissionsChecker;
  }
  return null;
}

export type { PermissionsChecker } from './types';
