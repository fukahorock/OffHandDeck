import { systemPreferences } from 'electron';
import type { PermissionsChecker } from './types';

// 準備段階の調査ではnut.js側の新API（hasAccessibilityPermission等）を使う想定だったが、
// これは有償の本家パッケージ（@nut-tree/nut-js）向けの機能で、無償フォーク
// （@nut-tree-fork/nut-js、現時点で最新4.2.6）にはまだ含まれていないことが判明した。
// 代わりにElectron本体が提供するsystemPreferences.isTrustedAccessibilityClientを使う。
// これはMac専用API。
export const macPermissionsChecker: PermissionsChecker = {
  hasAccessibilityPermission(): boolean {
    return systemPreferences.isTrustedAccessibilityClient(false);
  },

  requestAccessibilityPermission(): boolean {
    // prompt=trueにすると、未許可の場合にシステム設定を開くよう促すダイアログが表示される
    return systemPreferences.isTrustedAccessibilityClient(true);
  },
};
