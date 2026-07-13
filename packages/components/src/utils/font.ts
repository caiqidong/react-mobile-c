const DEFAULT_FONT_TIMEOUT = 3000;

export function waitForFont(fontFamily: string, timeout = DEFAULT_FONT_TIMEOUT): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) {
    return Promise.resolve();
  }

  const normalizedFamily = fontFamily.trim();

  if (!normalizedFamily) {
    return Promise.reject(new TypeError('Font family must not be empty.'));
  }

  const fontDeclaration = `16px "${normalizedFamily.replace(/"/g, '\\"')}"`;

  return new Promise((resolve) => {
    let isSettled = false;
    const finish = () => {
      if (isSettled) {
        return;
      }

      isSettled = true;
      clearTimeout(timeoutId);
      resolve();
    };
    const timeoutId = window.setTimeout(finish, Math.max(0, timeout));

    document.fonts.load(fontDeclaration).then(finish, finish);
  });
}
