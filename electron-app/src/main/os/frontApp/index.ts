import type { FrontAppDetector } from './types';
import { macFrontAppDetector } from './mac';
import { windowsFrontAppDetector } from './windows';

export function getFrontAppDetector(): FrontAppDetector {
  switch (process.platform) {
    case 'darwin':
      return macFrontAppDetector;
    case 'win32':
      return windowsFrontAppDetector;
    default:
      throw new Error(`未対応のOSです: ${process.platform}`);
  }
}

export type { FrontAppDetector } from './types';
