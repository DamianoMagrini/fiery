/**
 * An array of class values.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
type ClassArray = Array<ClassValue>;

/**
 * A dictionary of classes, where keys are class names and the values' boolean
 * equivalent is whether or not the class name will be included.
 */
interface ClassDictionary {
  [class_name: string]: string | number | boolean | null | undefined;
}

/**
 * Any supported class value. This can be:
 * - an array of class names or class values (the final class name is computed
 *   recursively);
 * - a `ClassDictionary`;
 * - a string (class name);
 * - a number, which will be converted into a string;
 * - a boolean, which will also be converted into a string if `true` and
 *   ignored if `false`;
 * - `null`/`undefined`, which will be ignored.
 *
 * Note that all falsy values are ignored.
 */
type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | boolean
  | null
  | undefined;

/**
 * A function that converts a `ClassValue` to a string class name.
 *
 * @param class_value The `ClassValue` to convert.
 *
 * @returns The class name as a string.
 */
const to_value = (class_value: ClassValue): string => {
  let class_name = '';

  if (class_value) {
    if (typeof class_value === 'object') {
      if (class_value instanceof Array) {
        for (let index = 0; index < class_value.length; index++) {
          const temporary_value = to_value(class_value[index]);
          if (class_value[index] && temporary_value)
            class_name += temporary_value;
        }
      } else {
        for (const key in class_value) {
          const temporary_value = to_value(key);
          if (class_value[key] && temporary_value)
            class_name += temporary_value;
        }
      }
    } else if (typeof class_value !== 'boolean') class_name += class_value;
  }

  return class_name;
};

/**
 * CLSX's main function, which takes in `ClassValue`s as arguments and outputs
 * the computed class name as a string.
 *
 * @param classes The classes to be returned. This is an array of `ClassValue`s.
 */
const clsx = (...classes: ClassValue[]): string => {
  let class_name = '';

  for (let index = 0; index < classes.length; index++) {
    const value = to_value(classes[index]);
    if (value) {
      if (class_name) class_name += ' ';
      class_name += value;
    }
  }

  return class_name;
};

export default clsx;
