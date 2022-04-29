class LayoutConfig {

  get l10nFolder(): string {
    return 'assets/l10n/';
  }

  get assetsFolder(): string {
    return 'assets/layouts/';
  }

}

export const layoutConfig = new LayoutConfig();
