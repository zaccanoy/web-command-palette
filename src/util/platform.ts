export enum Platform {
  Apple,
  Default,
}

export function getPlatform() {
  const platform = navigator.platform;
  return platform.search(/iPhone|iPod|iPad|Macintosh|MacIntel|MacPPC|Mac68K/)
    ? Platform.Apple
    : Platform.Default;
}
