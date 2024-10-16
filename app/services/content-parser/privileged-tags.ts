/**
 * Parses all privileged tags.
 * @param input The input string.
 * @param privileged Whether the user is privileged.
 * @returns The output string.
 */
export function parsePrivilegedTags(input: string, privileged?: boolean) {
  if (!privileged) {
    return input;
  }
  let output = input;
  for (const tag of simpleTags) {
    output = parsePrivilegedTag(output, tag);
  }
  return output;
}

/**
 * Parses the given privileged tag.
 * @param input: The input string.
 * @param tag The tag.
 * @returns The output string.
 */
function parsePrivilegedTag(input: string, tag: PrivilegedTag) {
  if (!tag.open.regex.test(input) || !tag.close.regex.test(input)) return input;
  const output = input
    .replaceAll(tag.open.regex, tag.open.replacement)
    .replaceAll(tag.close.regex, tag.close.replacement);
  return output;
}

interface PrivilegedTag {
  open: {
    regex: RegExp;
    replacement: string;
  };
  close: {
    regex: RegExp;
    replacement: string;
  };
}

const simpleTags: PrivilegedTag[] = [
  {
    open: {
      regex: /\[mod\]/gi,
      replacement: '<p class="mod">',
    },
    close: {
      regex: /\[\/mod\]/gi,
      replacement: '</p>',
    },
  },
];
