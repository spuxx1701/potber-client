/**
 * Parses an XML string.
 * @param input The string to parse.
 * @returns The XML element.
 */
export function parseXmlString(input: string) {
  const domParser = new DOMParser();
  return domParser.parseFromString(input, 'text/xml');
}
