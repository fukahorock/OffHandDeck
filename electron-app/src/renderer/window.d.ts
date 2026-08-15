// preload.tsでcontextBridge経由で公開しているAPIの型宣言。

export interface OffHandDeckBridge {
  keySender: {
    send(assignedKeys: string[]): Promise<void>;
    isReservedByOS(assignedKeys: string[]): Promise<boolean>;
  };
  permissions: {
    hasAccessibilityPermission(): Promise<boolean>;
    requestAccessibilityPermission(): Promise<boolean>;
  };
  frontApp: {
    getFrontmostAppId(): Promise<string | null>;
  };
}

declare global {
  interface Window {
    offHandDeck: OffHandDeckBridge;
  }
}
