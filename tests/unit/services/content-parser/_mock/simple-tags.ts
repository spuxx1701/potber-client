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
];
