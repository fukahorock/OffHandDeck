import { keyboard, Key } from '@nut-tree-fork/nut-js';
import type { KeySender } from './types';

// 内部共通キーコード表記（小文字文字列）→ nut.jsのKey enumへの変換テーブル。
// 仕様書のassignedKeysはこの表記を前提とする（例: ["cmd", "s"]）。
const KEY_MAP: Record<string, Key> = {
  cmd: Key.LeftCmd,
  ctrl: Key.LeftControl,
  alt: Key.LeftAlt,
  shift: Key.LeftShift,
  option: Key.LeftAlt,
  win: Key.LeftWin,

  a: Key.A, b: Key.B, c: Key.C, d: Key.D, e: Key.E, f: Key.F, g: Key.G,
  h: Key.H, i: Key.I, j: Key.J, k: Key.K, l: Key.L, m: Key.M, n: Key.N,
  o: Key.O, p: Key.P, q: Key.Q, r: Key.R, s: Key.S, t: Key.T, u: Key.U,
  v: Key.V, w: Key.W, x: Key.X, y: Key.Y, z: Key.Z,

  '0': Key.Num0, '1': Key.Num1, '2': Key.Num2, '3': Key.Num3, '4': Key.Num4,
  '5': Key.Num5, '6': Key.Num6, '7': Key.Num7, '8': Key.Num8, '9': Key.Num9,

  f1: Key.F1, f2: Key.F2, f3: Key.F3, f4: Key.F4, f5: Key.F5, f6: Key.F6,
  f7: Key.F7, f8: Key.F8, f9: Key.F9, f10: Key.F10, f11: Key.F11, f12: Key.F12,

  space: Key.Space,
  enter: Key.Enter,
  return: Key.Return,
  esc: Key.Escape,
  escape: Key.Escape,
  tab: Key.Tab,
  backspace: Key.Backspace,
  delete: Key.Delete,
  up: Key.Up,
  down: Key.Down,
  left: Key.Left,
  right: Key.Right,
  comma: Key.Comma,
  period: Key.Period,
  slash: Key.Slash,
  minus: Key.Minus,
  equal: Key.Equal,
};

function toNutKeys(assignedKeys: string[]): Key[] {
  return assignedKeys.map((k) => {
    const nutKey = KEY_MAP[k.toLowerCase()];
    if (nutKey === undefined) {
      throw new Error(`未対応のキーコードです: ${k}`);
    }
    return nutKey;
  });
}

// Mac予約済みショートカット（代表的なもののみ。実測しながら拡充する）
const MAC_RESERVED: string[][] = [
  ['cmd', 'q'],
  ['cmd', 'w'],
  ['cmd', 'tab'],
  ['cmd', 'space'],
  ['cmd', 'option', 'esc'],
  ['cmd', 'shift', 'q'],
];

function normalize(keys: string[]): string {
  return [...keys].map((k) => k.toLowerCase()).sort().join('+');
}

export const macKeySender: KeySender = {
  async send(assignedKeys: string[]): Promise<void> {
    const keys = toNutKeys(assignedKeys);
    // 仕様のkeyboard.pressKey/releaseKeyは修飾キーを先、押したいキーを後の順で渡す前提のため、
    // assignedKeysの並び順をそのまま踏襲する（呼び出し側で修飾キーを先頭にしておくこと）
    await keyboard.pressKey(...keys);
    await keyboard.releaseKey(...keys);
  },

  isReservedByOS(assignedKeys: string[]): boolean {
    const target = normalize(assignedKeys);
    return MAC_RESERVED.some((reserved) => normalize(reserved) === target);
  },
};
