/// <reference path="enzyme-global.d.ts" />

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';

// import { JSDOM } from 'jsdom';

configure({ adapter: new Adapter() });

// /*
//   Because a browser environment is required for Enzyme to render/mount
//   components, we initialize a JSDOM instance.
// */
// const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

// const { window } = jsdom;

// const copy_props = (src: object, target: object) => {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target)
//   });
// };

// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: 'node.js'
// };
// global.requestAnimationFrame = (callback: FrameRequestCallback) =>
//   (<unknown>setTimeout(callback, 0)) as number;
// global.cancelAnimationFrame = (id: number) => clearTimeout(id);

// copy_props(window, global);
