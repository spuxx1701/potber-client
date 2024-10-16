export const tableTagMocks: ContentParserMock[] = [
  {
    input: 'hello world',
    expected: 'hello world',
  },
  {
    input: '[table]hello world[/table]',
    expected: '<table><tr><td>hello world</td></tr></table>',
  },
  {
    input: '[table]Hello[||]World[--]Foo[||]Bar[/table]',
    expected:
      '<table><tr><td>Hello</td><td>World</td></tr><tr><td>Foo</td><td>Bar</td></tr></table>',
  },
  {
    input: `[table]
    
    Ameisenfutter [||] JS & Web-Kram (<a href="https://github.com/spuxx1701" target="_blank">GitHub</a>)
    
    [--]
    
    anoX* [||] so ziemlich alles (und ABAP, lel)
    
    [--]
    
    Atomsk [||] TSQL, DAX, C#
    
    [/table]`,
    expected: `<table><tr><td>Ameisenfutter</td><td>JS & Web-Kram (<a href="https://github.com/spuxx1701" target="_blank">GitHub</a>)</td></tr><tr><td>anoX*</td><td>so ziemlich alles (und ABAP, lel)</td></tr><tr><td>Atomsk</td><td>TSQL, DAX, C#</td></tr></table>`,
  },
  {
    input: '[table border=0]Hello[||]World[--]Foo[||]Bar[/table]',
    expected:
      '<table><tr><td>Hello</td><td>World</td></tr><tr><td>Foo</td><td>Bar</td></tr></table>',
  },
];
