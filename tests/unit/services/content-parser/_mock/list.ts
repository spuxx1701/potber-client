export const listTagMocks: ContentParserMock[] = [
  {
    input: 'hello world',
    expected: 'hello world',
  },
  {
    input: `[b]hello world[/b]`,
    expected: `<b>hello world</b>`,
  },
];
