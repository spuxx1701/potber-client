import {
  findIconDefinition,
  icon,
  IconLookup,
} from '@fortawesome/fontawesome-svg-core';

/**
 * Returns the given `font-awesome` icon as a pure string containing parseable HTML.
 * Useful if you want to use `font-awesome` icons dynamically after the rendering
 * of `handlebars` has already happened.
 * @param iconLookup The icon lookup details.
 * @returns The string containing the icon's HTML.
 */
export function getFaIconHtmlString(iconLookup: IconLookup) {
  const iconDefinition = findIconDefinition(iconLookup);
  const iconObject = icon(iconDefinition);
  const { node } = iconObject;
  let string = '';
  for (const element of node) {
    string += element.outerHTML;
  }
  return string;
}
