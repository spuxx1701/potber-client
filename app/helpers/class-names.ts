import Helper from '@ember/component/helper';

interface Context {
  styles: {
    [className: string]: string;
  };
  constructor: {
    name: string;
  };
}

type Positional = [Context, ...string[]];

interface Signature {
  Args: {
    Positional: Positional;
  };
  Return: string;
}

/**
 * Helper class for computing class names based on a given context and a list of class names. The context
 * needs to be the component or controller class that has the styles object assigned to it.
 */
export default class ClassNames extends Helper<Signature> {
  /**
   * Computes the class names based on the given context and list of class names.
   * @param {Positional} args - The arguments passed to the compute method.
   * @returns {string} - The computed class names as a string.
   */
  compute([context, ...classNames]: Positional): string {
    if (!context) {
      console.error("You did not pass a context to the 'classNames' helper.");
      return '';
    }
    if (typeof context?.styles === 'undefined') {
      console.error(
        `${context.constructor.name} does not have any styles. Did you forget to assign your styles to the 'styles' property?`,
      );
      return '';
    }

    const classString = classNames
      .join(' ')
      .split(/\s+/g)
      .filter((element) => element)
      .map((name) => {
        if (context?.styles && context?.styles[name]) {
          return context.styles[name];
        }
        console.error(`The class or id '${name}' does not exist.`);
        return '';
      })
      .join(' ');

    return classString;
  }
}
