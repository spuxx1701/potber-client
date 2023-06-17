export const simpleTagMocks: ContentParserMock[] = [
  {
    input: 'hello world',
    expected: 'hello world',
  },
  {
    input: `[b]hello world[/b]`,
    expected: `<b>hello world</b>`,
  },
  {
    input: `[i]hello world[/i]`,
    expected: `<i>hello world</i>`,
  },
  {
    input: `[s]hello world[/s]`,
    expected: `<s>hello world</s>`,
  },
  {
    input: `[u]hello world[/u]`,
    expected: `<u>hello world</u>`,
  },
  {
    input: `[mod]hello world[/mod]`,
    expected: `<p class="mod">hello world</p>`,
  },
  {
    input: `[tex]hello world[/tex]`,
    expected: `<p class="tex">hello world</p>`,
  },
  {
    input: `[trigger]hello world[/trigger]`,
    expected: `<p class="trigger" onclick="this.className=null;">hello world</p>`,
  },
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
    input: '[spoiler]hello world[/spoiler]',
    expected:
      '<label class="spoiler"><input class="spoiler-input" type="checkbox"/><p class="spoiler-header">👀 Spoiler anzeigen</p><span class="spoiler-content">hello world</span></label>',
  },
];
