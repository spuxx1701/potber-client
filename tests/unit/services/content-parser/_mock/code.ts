export const codeTagMocks: ContentParserMock[] = [
  {
    input: '[code]hello world[/code]',
    expected: '<code>hello world</code>',
  },
  {
    input: `[code]<div class="foo">bar</bar><input/>
    <foo>blablubb[/code]`,
    expected: `<code><div class="foo">bar</bar><input/>
    <foo>blablubb</code>`,
  },
  {
    input: `Ich trage ein:
    [code]
    [video] [URL]https://www.youtube.com/watch?v=5fFpMnPC3Sk[/URL][/video]
    [/code]`,
    expected: `Ich trage ein:
    <code>
    &lsqb;video&rsqb; &lsqb;URL&rsqb;https://www.youtube.com/watch?v=5fFpMnPC3Sk&lsqb;/URL&rsqb;&lsqb;/video&rsqb;
    </code>`,
  },
];
