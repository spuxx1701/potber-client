import { helper } from '@ember/component/helper';

export function isFinalElement([element, array]: [any, any[]]) {
  if (!element || !array || !Array.isArray(array)) {
    throw new Error(
      'is-final-element helper requires exactly two arguments with the second argument being an array.'
    );
  } else {
    return array[array.length - 1] === element;
  }
}

export default helper(isFinalElement);
