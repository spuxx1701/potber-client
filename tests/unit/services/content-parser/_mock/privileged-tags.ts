export const privilegedTagMocks = {
  privileged: [
    {
      input: 'hello world',
      expected: 'hello world',
    },
    {
      input: `[mod]hello world[/mod]`,
      expected: `<p class="mod">hello world</p>`,
    },
  ] as ContentParserMock[],
  unprivileged: [
    {
      input: 'hello world',
      expected: 'hello world',
    },
    {
      input: `[mod]hello world[/mod]`,
      expected: `[mod]hello world[/mod]`,
    },
  ] as ContentParserMock[],
};
