import Helper from '@ember/component/helper';

export default class Styles extends Helper {
  compute(params: [{ styles: { [className: string]: string } }, [string]]) {
    const [context, ...classNames] = params;
    if (typeof context?.styles === 'undefined') {
      console.error(
        'Import and assign your styles to your component class or controller class',
      );
      return '';
    }

    const classString = classNames
      .join(' ')
      .split(/\s+/g)
      .map((name) => {
        if (context?.styles && context?.styles[name]) {
          return context.styles[name];
        }

        console.error(`The class or id named '${name}' does not exist`);

        return '';
      })
      .join(' ');

    return classString;
  }
}
