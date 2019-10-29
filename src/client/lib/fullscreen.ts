/* eslint-disable @typescript-eslint/ban-ts-ignore */
// ts-ignore is required for compatibility across browsers here.

/**
 * Enter fullscreen mode.
 */
export const enter_fullscreen = (): void => {
  const element = document.documentElement;

  if ('requestFullscreen' in element) element.requestFullscreen();
  else if ('mozRequestFullScreen' in element)
    // @ts-ignore
    element.mozRequestFullScreen();
  else if ('webkitRequestFullscreen' in element)
    // @ts-ignore
    element.webkitRequestFullscreen();
  else if ('msRequestFullscreen' in element)
    // @ts-ignore
    element.msRequestFullscreen();
};

/**
 * Exit fullscreen mode.
 */
export const exit_fullscreen = (): void => {
  if ('exitFullscreen' in document) document.exitFullscreen();
  else if ('mozExitFullScreen' in document)
    // @ts-ignore
    document.mozExitFullScreen();
  else if ('webkitExitFullscreen' in document)
    // @ts-ignore
    document.webkitExitFullscreen();
  else if ('msExitFullscreen' in document)
    // @ts-ignore
    document.msExitFullscreen();
};
