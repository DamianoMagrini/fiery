/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ExtensibleEvent extends Event {
  [key: string]: any;
}
