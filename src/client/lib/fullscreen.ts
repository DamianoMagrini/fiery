/**
 * Enter fullscreen mode.
 */
export const enter_fullscreen = () => {
  const document_element = document.documentElement;

  if ('requestFullscreen' in document_element)
    document_element.requestFullscreen();
  else if ('mozRequestFullScreen' in document_element)
    // @ts-ignore
    document_element.mozRequestFullScreen();
  else if ('webkitRequestFullscreen' in document_element)
    // @ts-ignore
    document_element.webkitRequestFullscreen();
  else if ('msRequestFullscreen' in document_element)
    // @ts-ignore
    document_element.msRequestFullscreen();
};

/**
 * Exit fullscreen mode.
 */
export const exit_fullscreen = () => {
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
