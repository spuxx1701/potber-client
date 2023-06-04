/**
 * Parses all simple tags.
 * @param input The input string.
 * @returns The output string.
 */
export function parseSimpleTags(input: string) {
  let output = input;
  for (const tag of simpleTags) {
    output = parseSimpleTag(output, tag);
  }
  return output;
}

/**
 * Parses the given tag.
 * @param input: The input string.
 * @param tag The tag.
 * @returns The output string.
 */
function parseSimpleTag(input: string, tag: SimpleTag) {
  if (!tag.open.regex.test(input) || !tag.close.regex.test(input)) return input;
  const output = input
    .replaceAll(tag.open.regex, tag.open.replacement)
    .replaceAll(tag.close.regex, tag.close.replacement);
  return output;
}

interface SimpleTag {
  open: {
    regex: RegExp;
    replacement: string;
  };
  close: {
    regex: RegExp;
    replacement: string;
  };
}

const simpleTags: SimpleTag[] = [
  {
    open: {
      regex: /\[b\]/gi,
      replacement: '<b>',
    },
    close: {
      regex: /\[\/b\]/gi,
      replacement: '</b>',
    },
  },
  {
    open: {
      regex: /\[i\]/gi,
      replacement: '<i>',
    },
    close: {
      regex: /\[\/i\]/gi,
      replacement: '</i>',
    },
  },
  {
    open: {
      regex: /\[s\]/gi,
      replacement: '<s>',
    },
    close: {
      regex: /\[\/s\]/gi,
      replacement: '</s>',
    },
  },
  {
    open: {
      regex: /\[u\]/gi,
      replacement: '<u>',
    },
    close: {
      regex: /\[\/u\]/gi,
      replacement: '</u>',
    },
  },
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
  {
    open: {
      regex: /\[tex\]/gi,
      replacement: '<p class="tex">',
    },
    close: {
      regex: /\[\/tex\]/gi,
      replacement: '</p>',
    },
  },
  {
    open: {
      regex: /\[trigger\]/gi,
      replacement: '<p class="trigger" onclick="this.className=null;">',
    },
    close: {
      regex: /\[\/trigger\]/gi,
      replacement: '</p>',
    },
  },
  {
    open: {
      regex: /\[code\]/gi,
      replacement: '<code>',
    },
    close: {
      regex: /\[\/code\]/gi,
      replacement: '</code>',
    },
  },
];
