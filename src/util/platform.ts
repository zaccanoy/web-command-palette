/**
 * Represents the platform a user is on.
 * @internal
 */
export enum Platform {
  Apple,
  Default,
}

/**
 * This regular expression matches most any Apple platform.
 * @remark This is likely a bit of overkill, but it is the most correct. For
 * example, how many people are using keyboard shortcuts on their PowerPC Mac or
 * iPod Touch?
 * @internal
 */
const applePlatformRegex: RegExp = /iPhone|iPod|iPad|Macintosh|MacIntel|MacPPC|Mac68K/;

/**
 * Returns the platform a user is on.
 * @remark Currently, all that matters is if the platform is an Apple one or
 * not.
 * @internal
 */
export function getPlatform(): Platform {
  const platform: string = navigator.platform;

  return platform.search(applePlatformRegex) > -1
    ? Platform.Apple
    : Platform.Default;
}
