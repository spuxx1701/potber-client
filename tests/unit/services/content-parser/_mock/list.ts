export const listTagMocks: ContentParserMock[] = [
  {
    input: 'hello world',
    expected: 'hello world',
  },
  {
    input: `[list][*]Foo\r\n[*]Bar\r\n[/list]`,
    expected: `<ul><li>Foo</li><li>Bar</li></ul>`,
  },
  {
    input: `[list][*]Foo[*]Bar[/list]`,
    expected: `<ul><li>Foo</li><li>Bar</li></ul>`,
  },
  {
    input:
      '<b>3.2 Links</b>\n' +
      '[list][*] <a href="https://api.potber.de" target="_blank">potber-api</a>' +
      '[*] <a href="https://test-api.potber.de" target="_blank">potber-api (Testumgebung)</a> - Neue Features können hier getestet werden (obacht, instabil!)' +
      '[*] <a href="https://github.com/spuxx1701/potber-api/blob/develop/README.md" target="_blank">Dokumentation</a>' +
      '[*] <a href="https://github.com/spuxx1701/potber-api/blob/develop/CHANGELOG.md" target="_blank">Changelog</a>' +
      '[*] <a href="https://github.com/spuxx1701/potber-api/issues" target="_blank">GitHub Issues</a> - Bugs & Feature requests' +
      '[*]<a href="https://github.com/spuxx1701/potber-api" target="_blank">GitHub Repository</a>' +
      '[*] <a href="https://hub.docker.com/repository/docker/spuxx/potber-api/general" target="_blank"> DockerHub Repository</a>' +
      '[/list]',
    expected:
      '<b>3.2 Links</b>' +
      '\n<ul><li><a href="https://api.potber.de" target="_blank">potber-api</a></li>' +
      '<li><a href="https://test-api.potber.de" target="_blank">potber-api (Testumgebung)</a> - Neue Features können hier getestet werden (obacht, instabil!)</li>' +
      '<li><a href="https://github.com/spuxx1701/potber-api/blob/develop/README.md" target="_blank">Dokumentation</a></li>' +
      '<li><a href="https://github.com/spuxx1701/potber-api/blob/develop/CHANGELOG.md" target="_blank">Changelog</a></li>' +
      '<li><a href="https://github.com/spuxx1701/potber-api/issues" target="_blank">GitHub Issues</a> - Bugs & Feature requests</li>' +
      '<li><a href="https://github.com/spuxx1701/potber-api" target="_blank">GitHub Repository</a></li>' +
      '<li><a href="https://hub.docker.com/repository/docker/spuxx/potber-api/general" target="_blank"> DockerHub Repository</a></li></ul>',
  },
  {
    input: 'List with newline\n[list]\n[*] Foo\n[*] Bar\n[/list]',
    expected: 'List with newline\n<ul><li>Foo</li><li>Bar</li></ul>',
  },
];
