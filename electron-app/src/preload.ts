// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

// レンダラー側（判定ロジック・UI）からOS機能を呼び出すための最小限のブリッジ。
// contextIsolation前提で、必要なメソッドだけを明示的に公開する。
contextBridge.exposeInMainWorld('offHandDeck', {
  keySender: {
    send: (assignedKeys: string[]) => ipcRenderer.invoke('key-sender:send', assignedKeys),
    isReservedByOS: (assignedKeys: string[]) =>
      ipcRenderer.invoke('key-sender:is-reserved', assignedKeys),
  },
  permissions: {
    hasAccessibilityPermission: () => ipcRenderer.invoke('permissions:has-accessibility'),
    requestAccessibilityPermission: () =>
      ipcRenderer.invoke('permissions:request-accessibility'),
  },
  frontApp: {
    getFrontmostAppId: () => ipcRenderer.invoke('front-app:get-frontmost-id'),
  },
});
