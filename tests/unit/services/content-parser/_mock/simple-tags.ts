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
    input: `[m]hello world[/m]`,
    expected: `<pre>hello world</pre>`,
  },
  {
    input: `[trigger]hello world[/trigger]`,
    expected: `<p class="trigger" onclick="this.className=null;">hello world</p>`,
  },
  {
    input: '[spoiler]hello world[/spoiler]',
    expected:
      '<label class="spoiler"><input class="spoiler-input" type="checkbox"/><p class="spoiler-header">👀 Spoiler anzeigen</p><span class="spoiler-content">hello world</span></label>',
  },
];
