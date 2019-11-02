/* eslint-disable @typescript-eslint/ban-ts-ignore */
// ts-ignore is required for compatibility across browsers here.

/**
 * Enter fullscreen mode.
 *
 * @returns Whether the function succeeded.
 */
export const enter_fullscreen = async (): Promise<boolean> => {
  const element = document.documentElement;

  try {
    if ('requestFullscreen' in element) await element.requestFullscreen();
    else if ('mozRequestFullScreen' in element)
      // @ts-ignore
      await element.mozRequestFullScreen();
    else if ('webkitRequestFullscreen' in element)
      // @ts-ignore
      await element.webkitRequestFullscreen();
    else if ('msRequestFullscreen' in element)
      // @ts-ignore
      await element.msRequestFullscreen();

    return true;
  } catch {
    return false;
  }
};

/**
 * Exit fullscreen mode.
 *
 * @returns Whether the function succeeded.
 */
export const exit_fullscreen = async (): Promise<boolean> => {
  try {
    if ('exitFullscreen' in document) await document.exitFullscreen();
    else if ('mozExitFullScreen' in document)
      // @ts-ignore
      await document.mozExitFullScreen();
    else if ('webkitExitFullscreen' in document)
      // @ts-ignore
      await document.webkitExitFullscreen();
    else if ('msExitFullscreen' in document)
      // @ts-ignore
      await document.msExitFullscreen();

    return true;
  } catch {
    return false;
  }
};
